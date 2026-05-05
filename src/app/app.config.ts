import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from '@core/interceptors/auth.interceptor';
import {errorInterceptor} from '@core/interceptors/error.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {MAT_DATE_LOCALE} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    importProvidersFrom(
      FormsModule,
      MatFormFieldModule,
      MatInputModule
    ),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimations()
  ]
};
