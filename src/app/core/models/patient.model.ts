export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type AppointmentType = 'consultation' | 'examination' | 'surgery';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  avatarUrl?: string;
  insuranceNumber: string;
}

export interface Appointment {
  id: string;
  patient: Patient;
  doctorName: string;
  room: string;
  date: Date;
  status: AppointmentStatus;
  type: AppointmentType;
}
