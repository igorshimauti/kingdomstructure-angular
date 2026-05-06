import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrls: [ './sidebar.css']
})
export class SidebarComponent {
  private authService = inject(AuthService);

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
