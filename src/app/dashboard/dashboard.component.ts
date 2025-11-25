import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowbiteService } from '../services/flowbite.service';
import { FormsModule } from '@angular/forms';

// Import des charts
import { LineChartComponent } from './components/charts/line-chart/line-chart';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart';
import { DataTableComponent, Column } from './components/data-tabla/data-tabla.component';


interface Room {
  id: number;
  name: string;
  capacity: number;
  status: 'available' | 'occupied';
  equipment: string;
}

interface Booking {
  id: number;
  room: string;
  user: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface Stats {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
  totalReservations: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    DataTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private flowbiteService = inject(FlowbiteService);

  activeTab: string = 'overview';

  bookingColumns: Column[] = [
    { key: 'room', label: 'Salle', sortable: true },
    { key: 'user', label: 'Utilisateur', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'time', label: 'Horaire', sortable: false },
    { key: 'status', label: 'Statut', sortable: true }
  ];

  stats: Stats = {
    totalRooms: 24,
    occupiedRooms: 18,
    availableRooms: 6,
    totalReservations: 156
  };

  rooms: Room[] = [
    { id: 1, name: 'Salle A-101', capacity: 20, status: 'occupied', equipment: 'Projecteur, WiFi' },
    { id: 2, name: 'Salle B-205', capacity: 15, status: 'available', equipment: 'Tableau blanc' },
    { id: 3, name: 'Salle C-308', capacity: 30, status: 'occupied', equipment: 'Projecteur, Sono' },
    { id: 4, name: 'Salle D-112', capacity: 10, status: 'available', equipment: 'WiFi' },
    { id: 5, name: 'Salle E-420', capacity: 50, status: 'occupied', equipment: 'Projecteur, Sono, WiFi' },
    { id: 6, name: 'Salle F-215', capacity: 25, status: 'available', equipment: 'Projecteur, WiFi, Tableau' }
  ];

  bookings: Booking[] = [
    { id: 1, room: 'Salle A-101', user: 'Jean Dupont', date: '2024-11-24', time: '09:00 - 11:00', status: 'confirmed' },
    { id: 2, room: 'Salle B-205', user: 'Marie Martin', date: '2024-11-24', time: '14:00 - 16:00', status: 'confirmed' },
    { id: 3, room: 'Salle C-308', user: 'Pierre Bernard', date: '2024-11-25', time: '10:00 - 12:00', status: 'pending' },
    { id: 4, room: 'Salle D-112', user: 'Sophie Laurent', date: '2024-11-25', time: '15:00 - 17:00', status: 'cancelled' },
    { id: 5, room: 'Salle E-420', user: 'Luc Moreau', date: '2024-11-26', time: '08:00 - 10:00', status: 'confirmed' }
  ];

  recentBookings: Booking[] = [];

  ngOnInit(): void {
    this.recentBookings = this.bookings.slice(0, 5);

    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded');
    });
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  addRoom(): void {
    console.log('Add room');
  }

  addUser(): void {
    console.log('Add user');
  }

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'confirmed': 'Confirmée',
      'pending': 'En attente',
      'cancelled': 'Annulée'
    };
    return labels[status] || status;
  }

  getRoomStatusBadgeClass(status: string): string {
    return status === 'occupied'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  }

  getRoomStatusLabel(status: string): string {
    return status === 'occupied' ? 'Occupée' : 'Disponible';
  }
}
