import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Appointment, PatientInfoForm, ConsultationForm, ExaminationForm, SurgeryForm } from '../models/patient.model';
import { APPOINTMENTS_MOCK } from '../mocks/appointments.mock';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private http = inject(HttpClient);

  getAppointments(): Observable<Appointment[]> {
    return of(APPOINTMENTS_MOCK).pipe(delay(500));
  }

  getAppointmentById(id: string): Observable<Appointment | undefined> {
    return of(APPOINTMENTS_MOCK.find(a => a.id === id)).pipe(delay(500));
  }

  savePatientInfo(id: string, data: PatientInfoForm): Observable<void> {
    return of(undefined).pipe(delay(400));
  }

  saveAppointmentForm(id: string, data: ConsultationForm | ExaminationForm | SurgeryForm): Observable<void> {
    return of(undefined).pipe(delay(400));
  }
}
