import {Component, Input, OnInit, AfterViewInit, inject, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../../../services/flowbite.service';
import {FormsModule} from '@angular/forms';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-tabla.component.html',
  styleUrls: ['./data-tabla.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  // private flowbiteService = inject(FlowbiteService); // Retiré ou commenté

  @Input() data: any[] = [];
  @Input() columns: Column[] = [];
  @Input() itemsPerPage: number = 5;
  @Input() showActions: boolean = true;

  currentPage: number = 1;
  totalPages: number = 1;
  paginatedData: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Utilisez ngOnChanges pour détecter les changements d'input
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue !== changes['data'].previousValue) {
      this.calculatePagination();
    }
  }

  ngOnInit(): void {
    // L'initialisation est maintenant gérée par ngOnChanges lorsque les données arrivent
    // Si data est déjà là au démarrage (peu probable), cela fonctionnera quand même.
  }

  ngAfterViewInit(): void {
    // Si vous utilisez encore FlowbiteService pour initialiser, gardez ceci, sinon retirez-le
    /*
    this.flowbiteService.loadFlowbite(() => {
      console.log('Flowbite loaded for DataTable');
    });
    */
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  // ... (Le reste des méthodes goToPage, nextPage, previousPage, sortBy, getPageNumbers, getStatusBadgeClass, getStatusLabel, viewItem, editItem, deleteItem, Math...) ...
  // ... (Le reste du code ci-dessous est identique au vôtre, il est fonctionnel) ...

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.data.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updatePaginatedData();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (this.currentPage >= this.totalPages - 2) {
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'confirmed': 'bg-green-100 text-green-800 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return classes[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'confirmed': 'Confirmée',
      'pending': 'En attente',
      'cancelled': 'Annulée'
    };
    return labels[status] || status;
  }

  viewItem(item: any): void {
    console.log('View item:', item);
  }

  editItem(item: any): void {
    console.log('Edit item:', item);
  }

  deleteItem(item: any): void {
    console.log('Delete item:', item);
  }

  protected readonly Math = Math;
}
