import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.css']
})
export class InputSelectComponent {
  @Input() label: string = 'Selecione';
  @Input() options: { [key: string]: string } | string[] = [];
  @Input() control?: FormControl;
  @Input() placeholder: string = '';

  get isObject(): boolean {
    return !Array.isArray(this.options);
  }

  get objectKeys(): string[] {
    if (this.isObject) {
      return Object.keys(this.options as { [key: string]: string });
    }
    return [];
  }

  get arrayOptions(): string[] {
    if (!this.isObject) {
      return this.options as string[];
    }
    return [];
  }

  getValue(key: string): string {
    if (this.isObject) {
      return (this.options as { [key: string]: string })[key];
    }
    return key;
  }
}
