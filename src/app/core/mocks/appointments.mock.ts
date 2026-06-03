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
  {
    id: 'a1',
    patient: p[0],
    doctorName: 'Д-р Іваненко',
    room: '101',
    date: d(-2, 9),
    status: 'completed',
    type: 'consultation',
    previousNotes:
      'Пацієнт скаржився на біль у горлі та підвищену температуру. Призначено антибіотики та жарознижуючі. Рекомендовано повторний огляд через 7 днів.',
  },
  {
    id: 'a2',
    patient: p[1],
    doctorName: 'Д-р Сидоренко',
    room: '204',
    date: d(-1, 10, 30),
    status: 'completed',
    type: 'examination',
    previousNotes:
      'Направлення на загальний аналіз крові та УЗД черевної порожнини. Пацієнт натще, підготовка проведена. Попередні результати в межах норми.',
  },
  {
    id: 'a3',
    patient: p[2],
    doctorName: 'Д-р Іваненко',
    room: '101',
    date: d(-1, 14),
    status: 'cancelled',
    type: 'consultation',
    previousNotes:
      'Плановий огляд скасовано за ініціативою пацієнта. Необхідно перепризначити прийом найближчим часом.',
  },
  {
    id: 'a4',
    patient: p[3],
    doctorName: 'Д-р Мороз',
    room: '305',
    date: d(0, 8, 30),
    status: 'completed',
    type: 'surgery',
    previousNotes:
      'Планова операція на колінному суглобі (артроскопія). Пацієнт підготовлений, усі аналізи в нормі. Анестезіолог оглянутий вчора.',
  },
  {
    id: 'a5',
    patient: p[4],
    doctorName: 'Д-р Сидоренко',
    room: '204',
    date: d(0, 10),
    status: 'in-progress',
    type: 'examination',
    previousNotes:
      'МРТ шийного відділу хребта. Пацієнт скаржиться на хронічний біль у шиї протягом 3 місяців. Контрастне підсилення не потрібне.',
  },
  {
    id: 'a6',
    patient: p[5],
    doctorName: 'Д-р Іваненко',
    room: '101',
    date: d(0, 11, 30),
    status: 'in-progress',
    type: 'consultation',
    previousNotes:
      'Повторний прийом після курсу лікування гіпертонії. Пацієнт приймає Еналаприл 10 мг. АТ на попередньому огляді — 150/95.',
  },
  {
    id: 'a7',
    patient: p[6],
    doctorName: 'Д-р Мороз',
    room: '305',
    date: d(0, 13),
    status: 'scheduled',
    type: 'surgery',
    previousNotes:
      'Лапароскопічне видалення жовчного міхура. Холецистит підтверджено УЗД. Пацієнт дотримується безжирової дієти вже 2 тижні.',
  },
  {
    id: 'a8',
    patient: p[7],
    doctorName: 'Д-р Коломієць',
    room: '112',
    date: d(1, 9),
    status: 'scheduled',
    type: 'consultation',
    previousNotes:
      'Первинний прийом. Направлення від сімейного лікаря з підозрою на бронхіт. Рекомендовано зробити рентген грудної клітки.',
  },
  {
    id: 'a9',
    patient: p[8],
    doctorName: 'Д-р Сидоренко',
    room: '204',
    date: d(1, 11),
    status: 'scheduled',
    type: 'examination',
    previousNotes:
      'ЕКГ та ехокардіографія. Пацієнт скаржиться на серцебиття та задишку при навантаженні. Попередня ЕКГ — 6 місяців тому, норма.',
  },
  {
    id: 'a10',
    patient: p[9],
    doctorName: 'Д-р Мороз',
    room: '305',
    date: d(2, 8),
    status: 'scheduled',
    type: 'surgery',
    previousNotes:
      'Планова операція на щитоподібній залозі. МРТ та біопсія підтверджують доброякісний вузол. Ендокринолог дав дозвіл на операцію.',
  },
  {
    id: 'a11',
    patient: p[0],
    doctorName: 'Д-р Коломієць',
    room: '112',
    date: d(2, 10, 30),
    status: 'scheduled',
    type: 'examination',
    previousNotes:
      'Контрольне обстеження після курсу лікування. Аналіз крові на гормони щитоподібної залози та загальний аналіз. Пацієнтка натще.',
  },
  {
    id: 'a12',
    patient: p[2],
    doctorName: 'Д-р Іваненко',
    room: '101',
    date: d(3, 9, 30),
    status: 'scheduled',
    type: 'consultation',
    previousNotes:
      'Повторний прийом після скасованого візиту. Скарги на головний біль та запаморочення. Необхідно перевірити АТ і призначити лікування.',
  },
  {
    id: 'a13',
    patient: p[4],
    doctorName: 'Д-р Мороз',
    room: '305',
    date: d(3, 14),
    status: 'scheduled',
    type: 'surgery',
    previousNotes:
      'Повторна артроскопія правого плечового суглоба. Попередня операція 2 роки тому. Пацієнт скаржиться на обмежену рухливість після травми.',
  },
  {
    id: 'a14',
    patient: p[6],
    doctorName: 'Д-р Коломієць',
    room: '112',
    date: d(4, 9),
    status: 'scheduled',
    type: 'examination',
    previousNotes:
      'УЗД органів черевної порожнини — контрольне після операції. Пацієнтка дотримується дієти, скарг немає. Шов загоюється добре.',
  },
  {
    id: 'a15',
    patient: p[8],
    doctorName: 'Д-р Сидоренко',
    room: '204',
    date: d(4, 11, 30),
    status: 'scheduled',
    type: 'consultation',
    previousNotes:
      'Профілактичний огляд. Пацієнт без хронічних захворювань, остання госпіталізація — 5 років тому. Скарг немає.',
  },
];
