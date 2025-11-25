export interface Booking {
  id: number;
  room: string;
  user: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}
