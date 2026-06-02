import { Appointment } from '../models/patient.model';
import { PATIENTS_MOCK } from './patients.mock';

const p = PATIENTS_MOCK;

const d = (offsetDays: number, hour: number, minute = 0): Date => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  date.setHours(hour, minute, 0, 0);
  return date;
};

export const APPOINTMENTS_MOCK: Appointment[] = [
  { id: 'a1',  patient: p[0], doctorName: 'Д-р Іваненко',   room: '101', date: d(-2, 9),     status: 'completed',   type: 'consultation' },
  { id: 'a2',  patient: p[1], doctorName: 'Д-р Сидоренко',  room: '204', date: d(-1, 10, 30), status: 'completed',   type: 'examination'  },
  { id: 'a3',  patient: p[2], doctorName: 'Д-р Іваненко',   room: '101', date: d(-1, 14),     status: 'cancelled',   type: 'consultation' },
  { id: 'a4',  patient: p[3], doctorName: 'Д-р Мороз',      room: '305', date: d(0, 8, 30),   status: 'completed',   type: 'surgery'      },
  { id: 'a5',  patient: p[4], doctorName: 'Д-р Сидоренко',  room: '204', date: d(0, 10),      status: 'in-progress', type: 'examination'  },
  { id: 'a6',  patient: p[5], doctorName: 'Д-р Іваненко',   room: '101', date: d(0, 11, 30),  status: 'in-progress', type: 'consultation' },
  { id: 'a7',  patient: p[6], doctorName: 'Д-р Мороз',      room: '305', date: d(0, 13),      status: 'scheduled',   type: 'surgery'      },
  { id: 'a8',  patient: p[7], doctorName: 'Д-р Коломієць',  room: '112', date: d(1, 9),       status: 'scheduled',   type: 'consultation' },
  { id: 'a9',  patient: p[8], doctorName: 'Д-р Сидоренко',  room: '204', date: d(1, 11),      status: 'scheduled',   type: 'examination'  },
  { id: 'a10', patient: p[9], doctorName: 'Д-р Мороз',      room: '305', date: d(2, 8),       status: 'scheduled',   type: 'surgery'      },
  { id: 'a11', patient: p[0], doctorName: 'Д-р Коломієць',  room: '112', date: d(2, 10, 30),  status: 'scheduled',   type: 'examination'  },
  { id: 'a12', patient: p[2], doctorName: 'Д-р Іваненко',   room: '101', date: d(3, 9, 30),   status: 'scheduled',   type: 'consultation' },
  { id: 'a13', patient: p[4], doctorName: 'Д-р Мороз',      room: '305', date: d(3, 14),      status: 'scheduled',   type: 'surgery'      },
  { id: 'a14', patient: p[6], doctorName: 'Д-р Коломієць',  room: '112', date: d(4, 9),       status: 'scheduled',   type: 'examination'  },
  { id: 'a15', patient: p[8], doctorName: 'Д-р Сидоренко',  room: '204', date: d(4, 11, 30),  status: 'scheduled',   type: 'consultation' },
];
