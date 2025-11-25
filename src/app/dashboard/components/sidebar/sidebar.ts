import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  @Input() activeTab: string = 'overview';
  @Output() tabChange = new EventEmitter<string>();

  menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'trending' },
    { id: 'rooms', label: 'Salles', icon: 'door' },
    { id: 'bookings', label: 'Réservations', icon: 'calendar' },
    { id: 'users', label: 'Utilisateurs', icon: 'users' }
  ];

  selectTab(tabId: string): void {
    this.tabChange.emit(tabId);
  }
}
