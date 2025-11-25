import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.html',
  styleUrls: ['./room-card.css']
})
export class RoomCardComponent {
  @Input() room!: Room;

  getStatusBadgeClass(): string {
    return this.room.status === 'occupied'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  }

  getStatusLabel(): string {
    return this.room.status === 'occupied' ? 'Occupée' : 'Disponible';
  }

  editRoom(): void {
    console.log('Edit room:', this.room.id);
  }

  viewDetails(): void {
    console.log('View details:', this.room.id);
  }
}
