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
  previousNotes: string;
}

export interface PatientInfoForm {
  isPresent: boolean;
  allergies: string[];
  temperature: number | null;
  consentSigned: boolean;
}

export interface ConsultationForm {
  visitReason: string;
  complaints: string;
  diagnosis: string;
  medications: string[];
  needsFollowUp: boolean;
  followUpDays: number | null;
}

export interface ExaminationForm {
  examinationType: string;
  isFasting: boolean;
  referralNumber: string;
  results: { name: string; value: string; norm: string }[];
  resultsReceived: boolean;
  conclusion: string;
}

export interface SurgeryForm {
  anesthesiaType: string;
  durationMinutes: number | null;
  isFasting: boolean;
  documentsSigned: boolean;
  surgicalTeam: string[];
  operatingRoom: string;
  postOpInstructions: string;
  transferredToWard: boolean;
}
