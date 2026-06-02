import { Component, computed, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppointmentsService } from '../../core/services/appointments.service';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentStatusBadgeComponent } from '../dashboard/components/appointment-status-badge/appointment-status-badge.component';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    DatePipe,
    PatientInfoComponent,
    AppointmentFormComponent,
    AppointmentStatusBadgeComponent,
  ],
  templateUrl: './appointment-detail.component.html',
  styleUrl: './appointment-detail.component.scss',
})
export class AppointmentDetailComponent {
  private route = inject(ActivatedRoute);
  private appointmentsService = inject(AppointmentsService);

  private id = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id') ?? '')),
    { initialValue: '' },
  );

  appointment = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.appointmentsService.getAppointmentById(id)),
    ),
    { initialValue: undefined },
  );

  isLoading = computed(() => this.appointment() === undefined);
}
