import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MembroService} from '@core/services/membro.service';
import {TableComponent} from '@shared/components/table/table.component';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-membro',
  imports: [CommonModule, TableComponent, MatButton, MatIcon, RouterLink],
  templateUrl: './membro-list.component.html',
  styleUrl: './membro-list.component.css',
})
export class MembroListComponent implements OnInit {
  private membroService = inject(MembroService);
  private router = inject(Router);

  data = signal<any[]>([]);
  cols = [
    "id",
    "nomeCompleto",
    "cpf",
    "email",
    "telefone",
    "whatsapp",
    "funcao",
    "encontro",
    "consolidado",
    "batizado",
    "ceifeiros",
    "maturidade",
    "ctl",
    "seminarioPastoral"
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

    this.membroService.findAll({
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
    this.router.navigate(['/membros/edit', element.id]);
  }

  onDelete(element: any) {
    this.membroService.delete(element.id).subscribe(() => {
      this.buscarPagina(this.currentPage());
    });
  }
}
