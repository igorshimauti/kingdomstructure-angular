import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrls: [ './sidebar.css']
})
export class SidebarComponent {}
