import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../../../core/models/patient.model';
import { AppointmentStatusBadgeComponent } from '../../../../shared/ui/appointment-status-badge/appointment-status-badge.component';

const TYPE_LABEL: Record<string, string> = {
  consultation: 'Консультація',
  examination:  'Обстеження',
  surgery:      'Операція',
};

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, DatePipe, AppointmentStatusBadgeComponent],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent {
  appointments = input.required<Appointment[]>();
  selectedId   = input<string | null>(null);
  selectAppointment = output<string>();

  typeLabel(type: string): string {
    return TYPE_LABEL[type] ?? type;
  }
}
