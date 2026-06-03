import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap, finalize } from 'rxjs/operators';
import { map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../core/services/appointments.service';
import { AppointmentFormService } from './appointment-form.service';
import { PatientInfoComponent } from './ui/patient-info/patient-info.component';
import { AppointmentFormComponent } from './ui/appointment-form/appointment-form.component';
import { AppointmentHeaderComponent } from './ui/appointment-header/appointment-header';
import { ConsultationForm, ExaminationForm, PatientInfoForm, SurgeryForm } from '../../core/models/patient.model';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  providers: [AppointmentFormService],
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    PatientInfoComponent,
    AppointmentFormComponent,
    AppointmentHeaderComponent,
  ],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss',
})
export class AppointmentDetailComponent {
  private route = inject(ActivatedRoute);
  private appointmentsService = inject(AppointmentsService);
  private formService = inject(AppointmentFormService);

  private id = toSignal(this.route.paramMap.pipe(map((p) => p.get('id') ?? '')), {
    initialValue: '',
  });

  appointment = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.appointmentsService.getAppointmentById(id))),
    { initialValue: undefined },
  );

  isLoading = computed(() => this.appointment() === undefined);
  isEditing = signal(false);
  isSavingPatient = signal(false);
  isSavingForm = signal(false);

  startEditing(): void {
    this.formService.snapshotForms();
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    this.formService.resetToSnapshot();
    this.isEditing.set(false);
  }

  savePatientInfo(data: PatientInfoForm): void {
    this.isSavingPatient.set(true);

    this.appointmentsService
      .savePatientInfo(this.appointment()!.id, data)
      .pipe(finalize(() => this.isSavingPatient.set(false)))
      .subscribe(() => this.isEditing.set(false));
  }

  saveAppointment(data: ConsultationForm | ExaminationForm | SurgeryForm): void {
    this.isSavingForm.set(true);

    this.appointmentsService
      .saveAppointmentForm(this.appointment()!.id, data)
      .pipe(finalize(() => this.isSavingForm.set(false)))
      .subscribe(() => this.isEditing.set(false));
  }
}
