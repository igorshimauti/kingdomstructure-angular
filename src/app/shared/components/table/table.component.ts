import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() totalPages = 0;
  @Input() currentPage = 0;
  @Input() pageSize = 10;
  @Input() totalElements = 10;

  @Output() pageChange = new EventEmitter<number>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  visiblePages: number[] = [];

  ngOnChanges() {
    this.updateVisiblePages();
  }

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  get startItem(): number {
    return this.totalElements === 0 ? 0 : this.currentPage * this.pageSize + 1;
  }

  get endItem(): number {
    const end = (this.currentPage + 1) * this.pageSize;
    return end > this.totalElements ? this.totalElements : end;
  }


  updateVisiblePages() {
    const maxButtons = 5;
    const start = Math.floor(this.currentPage / maxButtons) * maxButtons;
    const end = Math.min(start + maxButtons, this.totalPages);

    this.visiblePages = Array.from({ length: end - start }, (_, i) => start + i);
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // edit(element: any) {
  // }

  confirmDelete(element: any) {
    const confirmed = window.confirm('Deseja realmente excluir esse registro?');
    if (confirmed) {
      this.delete.emit(element);
    }
  }

}
