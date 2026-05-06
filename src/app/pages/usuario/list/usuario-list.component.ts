import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TableComponent} from '@shared/components/table/table.component';
import {UsuarioService} from '@core/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  imports: [CommonModule, TableComponent, MatButton, MatIcon, RouterLink],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  data = signal<any[]>([]);
  cols = [
    'id',
    'nomeCompleto',
    'email',
    'tipoUsuario'
  ];

  page = signal(0);
  size = signal(10);
  totalPages = signal(0);
  currentPage = signal(0);
  totalElements = signal(0);

  ngOnInit() {
    this.buscarPagina(0);
  }

  buscarPagina(page: number) {
    this.page.set(page);

    this.usuarioService.findAll({
      page: this.page(),
      size: this.size()
    }).subscribe(res => {
      this.data.set(res.content);
      this.totalPages.set(res.totalPages);
      this.currentPage.set(res.pageable.pageNumber);
      this.totalElements.set(res.totalElements);
    });
  }

  onEdit(element: any) {
    this.router.navigate(['/usuarios/edit', element.id]);
  }

  onDelete(element: any) {
    this.usuarioService.delete(element.id).subscribe(() => {
      this.buscarPagina(this.currentPage());
    });
  }
}

