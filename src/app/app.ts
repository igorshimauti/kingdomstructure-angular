import {Component, inject} from '@angular/core';
import {HeaderComponent} from '@core/layout/header/header';
import {SidebarComponent} from '@core/layout/sidebar/sidebar';
import {FooterComponent} from '@core/layout/footer/footer';
import {Router, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';
import {AuthService} from '@core/services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ToastService} from '@core/services/toast.service';
import {ToastType} from '@shared/enums/toast-type.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, SidebarComponent, FooterComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);

  isAuthenticated = this.authService.isAuthenticated();

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogout() {
    this.authService.logout();
    this.toastService.show('Deslogado com sucesso!', ToastType.SUCCESS);
    this.router.navigate(['/login']);
  }
}
