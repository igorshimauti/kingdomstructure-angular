import {AfterViewInit, Component, DestroyRef, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {formatPhone, formatCpf, normalizeCpf, normalizePhone} from '../../utils/input-format.util';

type InputTextFormat = 'text' | 'cpf' | 'phone';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit, AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);

  @Input() label: string = 'Campo';
  @Input() placeholder: string = 'Digite aqui...';
  @Input() control!: FormControl;
  @Input() format: InputTextFormat = 'text';

  @ViewChild('textInput', {static: true}) textInput?: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.renderValue(value));
  }

  ngAfterViewInit(): void {
    this.renderValue(this.control.value);
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const normalizedValue = this.normalizeValue(input.value);

    queueMicrotask(() => {
      if (this.control.value !== normalizedValue) {
        this.control.setValue(normalizedValue);
      }

      this.renderValue(normalizedValue, input);
    });
  }

  get inputMode(): 'text' | 'numeric' {
    return this.format === 'text' ? 'text' : 'numeric';
  }

  get maxLength(): number | null {
    switch (this.format) {
      case 'cpf':
        return 14;
      case 'phone':
        return 15;
      default:
        return null;
    }
  }

  private normalizeValue(value: unknown): string {
    switch (this.format) {
      case 'cpf':
        return normalizeCpf(value);
      case 'phone':
        return normalizePhone(value);
      default:
        return String(value ?? '');
    }
  }

  private formatValue(value: unknown): string {
    switch (this.format) {
      case 'phone':
        return formatPhone(value);
      case 'cpf':
        return formatCpf(value);
      default:
        return this.normalizeValue(value);
    }
  }

  private renderValue(value: unknown, input?: HTMLInputElement): void {
    const nativeInput = input ?? this.textInput?.nativeElement;

    if (!nativeInput) {
      return;
    }

    nativeInput.value = this.formatValue(value);
  }
}
