import { Routes } from '@angular/router';
import {adminGuard, authGuard, loginGuard} from '@core/guards/auth.guard';
import {MembroListComponent} from './pages/membro/list/membro-list.component';
import {MembroFormComponent} from './pages/membro/form/membro-form.component';
import {UsuarioListComponent} from './pages/usuario/list/usuario-list.component';
import {UsuarioFormComponent} from './pages/usuario/form/usuario-form.component';

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
    path: 'usuarios',
    canActivate: [adminGuard],
    children: [
      { path: '', component: UsuarioListComponent },
      { path: 'new', component: UsuarioFormComponent },
      { path: 'edit/:id', component: UsuarioFormComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
