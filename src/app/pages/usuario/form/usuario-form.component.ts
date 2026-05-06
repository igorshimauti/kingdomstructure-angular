import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ToastService} from '@core/services/toast.service';
import {UsuarioService} from '@core/services/usuario.service';
import {InputBooleanComponent} from '@shared/components/input-boolean/input-boolean.component';
import {InputDateComponent} from '@shared/components/input-date/input-date.component';
import {InputNumberComponent} from '@shared/components/input-number/input-number.component';
import {InputPasswordComponent} from '@shared/components/input-password/input-password.component';
import {InputTextComponent} from '@shared/components/input-text/input-text.component';
import {ToastType} from '@shared/enums/toast-type.enum';
import {Usuario} from '@shared/models/usuario.model';
import {normalizeCpf, normalizePhone} from '@shared/utils/input-format.util';
import {cpfValidator} from '@shared/validators/cpf.validator';
import {telephoneValidator} from '@shared/validators/telephone.validator';
import {InputSelectComponent} from '@shared/components/input-select/input-select.component';
@Component({
  selector: 'app-usuario-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    InputTextComponent,
    InputNumberComponent,
    InputSelectComponent,
    InputBooleanComponent,
    InputDateComponent,
    InputPasswordComponent
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);
  private toast = inject(ToastService);
  form = new FormGroup({
    id: new FormControl({value: 0, disabled: true}, [Validators.required]),
    nomeCompleto: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl(''),
    cpf: new FormControl('', [Validators.required, cpfValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [telephoneValidator]),
    whatsapp: new FormControl(false),
    tipoUsuario: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  id?: number;
  isEditMode = false;
  tipos: { [key: string]: string } = {};

  ngOnInit() {
    this.carregarTipos();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.id;
    if (this.isEditMode) {
      this.form.controls.senha.clearValidators();
      this.form.controls.senha.addValidators([Validators.minLength(6)]);
      this.form.controls.senha.updateValueAndValidity();
      this.usuarioService.findById(this.id!).subscribe(res => {
        this.form.patchValue({
          id: res.id,
          cpf: normalizeCpf(res.cpf),
          email: res.email,
          nomeCompleto: res.nomeCompleto,
          dataNascimento: res.dataNascimento,
          telefone: normalizePhone(res.telefone),
          whatsapp: res.whatsapp,
          tipoUsuario: res.tipoUsuario,
        });
      });
    }
  }

  carregarTipos() {
    this.usuarioService.getTipos().subscribe({
      next: (tipos) => {
        this.tipos = tipos;
      },
      error: () => {
        this.toast.show('Erro ao carregar tipos de usuário', ToastType.ERROR);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const senha = this.form.controls.senha.value?.trim() ?? '';
    const payload: Partial<Usuario> = {
      ...(this.form.getRawValue() as Usuario),
      cpf: normalizeCpf(this.form.controls.cpf.value),
      telefone: normalizePhone(this.form.controls.telefone.value),
      senha,
    };
    if (this.isEditMode && !senha) {
      delete payload.senha;
    }
    if (this.isEditMode) {
      this.usuarioService.update(this.id!, payload as Usuario).subscribe(() => {
        this.toast.show('Usuário atualizado com sucesso', ToastType.SUCCESS);
        this.router.navigate(['/usuarios']);
      });
      return;
    }
    this.usuarioService.create(payload as Usuario).subscribe(() => {
      this.toast.show('Usuário cadastrado com sucesso', ToastType.SUCCESS);
      this.router.navigate(['/usuarios']);
    });
  }
}
