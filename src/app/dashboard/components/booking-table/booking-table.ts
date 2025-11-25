import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-table.html',
  styleUrls: ['./booking-table.css']
})
export class BookingTableComponent {
  @Input() bookings: Booking[] = [];
  @Input() showActions: boolean = true;

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

  viewBooking(id: number): void {
    console.log('View booking:', id);
  }

  cancelBooking(id: number): void {
    console.log('Cancel booking:', id);
  }

  editBooking(id: number): void {
    console.log('Edit booking:', id);
  }

  deleteBooking(id: number): void {
    console.log('Delete booking:', id);
  }
}
