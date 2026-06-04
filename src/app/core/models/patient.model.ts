export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export enum AppointmentType {
  Consultation = 'consultation',
  Examination = 'examination',
  Surgery = 'surgery',
}
export enum PatientType {
  Regular = 'regular',
  Military = 'military',
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  avatarUrl?: string;
  insuranceNumber: string;
  patientType: PatientType;
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
  patientType: PatientType;
  isPresent: boolean;
  allergies: string[];
  temperature: number | null;
  consentSigned: boolean;
  // military only
  combatInjuries?: string;
  psychologicalState?: string;
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
