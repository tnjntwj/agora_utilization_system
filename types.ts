
export type CongestionLevel = '空き' | 'やや混雑' | '混雑' | '満席';

export interface AreaStatus {
  id: string;
  name: string;
  level: CongestionLevel;
  occupancy: number; // 0 to 100
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
}

export interface Reservation {
  id: string;
  roomId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  purpose: string;
  count: number;
  userId: string;
}

export interface StudyGroup {
  id: string;
  theme: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  currentMembers: number;
  maxMembers: number;
  description: string;
  status: 'recruiting' | 'closed' | 'cancelled';
}

export interface EventInfo {
  id: string;
  title: string;
  date: string;
  location: string;
  target: string;
  content: string;
  likes: number;
}

export type UserRole = 'student' | 'staff';
