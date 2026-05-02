import {Component, Input} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-input-boolean',
  standalone: true,
  imports: [
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-boolean.component.html',
  styleUrls: ['./input-boolean.component.css']
})
export class InputBooleanComponent {
  @Input() label: string = 'Ativo';
  @Input() control!: FormControl;
}
