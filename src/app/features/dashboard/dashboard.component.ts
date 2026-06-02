import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentsService } from '../../core/services/appointments.service';
import { PatientListComponent } from './components/patient-list/patient-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatCardModule, MatIconModule, PatientListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private appointmentsService = inject(AppointmentsService);

  appointments = toSignal(
    this.appointmentsService.getAppointments(),
    { initialValue: [] },
  );

  isLoading = computed(() => this.appointments().length === 0);

  selectedAppointmentId = signal<string | null>(null);

  onSelectAppointment(id: string): void {
    this.selectedAppointmentId.set(id);
  }
}
