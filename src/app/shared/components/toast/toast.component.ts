import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgClass} from '@angular/common';
import {ToastType} from '@shared/enums/toast-type.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
})
export class ToastComponent {
  @Input() message = '';
  @Input() type: ToastType = ToastType.SUCCESS;

  get icon() {
    switch (this.type) {
      case ToastType.SUCCESS: return 'check_circle'
      case ToastType.ERROR: return 'error'
      case ToastType.WARNING: return 'warning'
      default: return 'info'
    }
  }
}
