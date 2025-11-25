export interface Room {
  id: number;
  name: string;
  capacity: number;
  status: 'available' | 'occupied';
  equipment: string;
}
