import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ToastService} from '@core/services/toast.service';
import {ToastType} from '@shared/enums/toast-type.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const toast = inject(ToastService);
  const router = inject(Router);
  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: token }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.error?.message?.includes('JWT expired')) {
        authService.logout();
        toast.show('Sessão expirada', ToastType.WARNING);
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
