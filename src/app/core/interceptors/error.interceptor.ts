import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastService} from '../services/toast.service';
import {catchError, throwError} from 'rxjs';
import {ToastType} from '@shared/enums/toast-type.enum';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401 || err.error?.message?.includes('JWT expired')) {
        return throwError(() => err);
      }

      const msg = err?.error?.message || 'Erro inesperado';
      toast.show(msg, ToastType.ERROR);
      return throwError(() => err);
    })
  );
};
