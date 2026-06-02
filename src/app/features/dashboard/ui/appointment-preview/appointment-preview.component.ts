import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Appointment } from '../../../../core/models/patient.model';
import { AppointmentStatusBadgeComponent } from '../../../../shared/ui/appointment-status-badge/appointment-status-badge.component';

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
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
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
