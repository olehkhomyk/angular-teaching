import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '@app/core/models/patient.model';
import { AppointmentStatusBadgeComponent } from '@app/shared/ui/appointment-status-badge/appointment-status-badge.component';

const TYPE_LABEL: Record<string, string> = {
  consultation: 'Консультація',
  examination: 'Обстеження',
  surgery: 'Операція',
};

@Component({
  selector: 'app-appointment-preview',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatIconModule,
    AppointmentStatusBadgeComponent,
  ],
  templateUrl: './appointment-preview.component.html',
  styleUrl: './appointment-preview.component.scss',
})
export class AppointmentPreviewComponent {
  appointment = input.required<Appointment>();

  typeLabel(type: string): string {
    return TYPE_LABEL[type] ?? type;
  }
}
