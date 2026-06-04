import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { map } from 'rxjs';
import { signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppointmentsService } from '../../core/services/appointments.service';
import { PatientInfoComponent } from './ui/patient-info/patient-info.component';
import { AppointmentHeaderComponent } from './ui/appointment-header/appointment-header';
import { AppointmentType, ConsultationForm, ExaminationForm, PatientInfoForm, SurgeryForm } from '../../core/models/patient.model';
import { AppointmentFormComponent } from './ui/appointment-form/appointment-form';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    PatientInfoComponent,
    AppointmentHeaderComponent,
    AppointmentFormComponent,
  ],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss',
})
export class AppointmentDetailComponent {
  private route = inject(ActivatedRoute);
  private appointmentsService = inject(AppointmentsService);

  private id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), {
    initialValue: '',
  });

  appointment = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.appointmentsService.getAppointmentById(id))),
    { initialValue: undefined },
  );

  type = computed(() => this.appointment()?.type);
  isLoading = computed(() => this.appointment() === undefined);

  isSavingPatient = signal(false);
  isSavingForm = signal(false);

  savePatientInfo(data: PatientInfoForm): void {
    this.isSavingPatient.set(true);

    this.appointmentsService
      .savePatientInfo(this.appointment()!.id, data)
      .pipe(finalize(() => this.isSavingPatient.set(false)))
      .subscribe();
  }

  saveAppointment(data: ConsultationForm | ExaminationForm | SurgeryForm): void {
    this.isSavingForm.set(true);

    this.appointmentsService
      .saveAppointmentForm(this.appointment()!.id, data)
      .pipe(finalize(() => this.isSavingForm.set(false)))
      .subscribe();
  }
}
