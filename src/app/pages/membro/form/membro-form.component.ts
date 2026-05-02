import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MembroService} from '@core/services/membro.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {InputTextComponent} from '@shared/components/input-text/input-text.component';
import {InputNumberComponent} from '@shared/components/input-number/input-number.component';
import {InputSelectComponent} from '@shared/components/input-select/input-select.component';
import {Membro} from '@shared/models/membro.model';
import {ToastService} from '@core/services/toast.service';
import {cpfValidator} from '@shared/validators/cpf.validator';
import {InputBooleanComponent} from '@shared/components/input-boolean/input-boolean.component';
import {ToastType} from '@shared/enums/toast-type.enum';
import {InputDateComponent} from '@shared/components/input-date/input-date.component';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, InputTextComponent, InputNumberComponent, InputSelectComponent, InputBooleanComponent, InputDateComponent],
  templateUrl: './membro-form.component.html',
  styleUrl: './membro-form.component.css',
})
export class MembroFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private membroService = inject(MembroService);
  private toast = inject(ToastService);

  form = new FormGroup({
    id: new FormControl({value: 0, disabled: true}, [Validators.required]),
    nomeCompleto: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl(''),
    cpf: new FormControl('', [Validators.required, cpfValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl(''),
    whatsapp: new FormControl(false),
    funcao: new FormControl('SEM_FUNCAO', [Validators.required]),
    encontro: new FormControl(false, [Validators.required]),
    consolidado: new FormControl(false, [Validators.required]),
    batizado: new FormControl(false, [Validators.required]),
    ceifeiros: new FormControl(false, [Validators.required]),
    maturidade: new FormControl(false, [Validators.required]),
    ctl: new FormControl(false, [Validators.required]),
    seminarioPastoral: new FormControl(false, [Validators.required])
  });

  id?: number;
  isEditMode = false;
  funcoes: { [key: string]: string } = {};

  ngOnInit() {
    this.carregarFuncoes();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.membroService.findById(this.id!).subscribe(res => {
        this.form.patchValue({
          id: res.id,
          cpf: res.cpf,
          email: res.email,
          nomeCompleto: res.nomeCompleto,
          telefone: res.telefone,
          whatsapp: res.whatsapp,
          funcao: res.funcao,
          encontro: res.encontro,
          consolidado: res.consolidado,
          batizado: res.batizado,
          ceifeiros: res.ceifeiros,
          maturidade: res.maturidade,
          ctl: res.ctl,
          seminarioPastoral: res.seminarioPastoral,
        });
      });
    }
  }

  carregarFuncoes() {
    this.membroService.getFuncoes().subscribe({
      next: (funcoes) => {
        this.funcoes = funcoes;
      },
      error: () => {
        this.toast.show('Erro ao carregar funções', ToastType.ERROR);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const payload: Membro = this.form.value as Membro;

      if (this.isEditMode) {
        this.membroService.update(this.id!, payload).subscribe(() => {
          this.toast.show('Membro atualizado com sucesso', ToastType.SUCCESS);
          this.router.navigate(['/membros']);
        });
      } else {
        this.membroService.create(payload).subscribe(() => {
          this.toast.show('Membro cadastrado com sucesso', ToastType.SUCCESS);
          this.router.navigate(['/membros']);
        });
      }
    }
  }

}
