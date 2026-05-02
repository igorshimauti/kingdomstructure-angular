import {ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable} from '@angular/core';
import {ToastComponent} from '@shared/components/toast/toast.component';
import {ToastType} from '@shared/enums/toast-type.enum';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(message: string, type: ToastType) {
    const compRef: ComponentRef<ToastComponent> = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    compRef.instance.message = message;
    compRef.instance.type = type;

    this.appRef.attachView(compRef.hostView);
    document.body.appendChild(compRef.location.nativeElement);

    setTimeout(() => {
      compRef.destroy();
    }, 3000);
  }
}
