import { Routes } from '@angular/router';
import {authGuard, loginGuard} from '@core/guards/auth.guard';
import {MembroListComponent} from './pages/membro/list/membro-list.component';
import {MembroFormComponent} from './pages/membro/form/membro-form.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./pages/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'membros',
    canActivate: [authGuard],
    children: [
      { path: '', component: MembroListComponent },
      { path: 'new', component: MembroFormComponent },
      { path: 'edit/:id', component: MembroFormComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
