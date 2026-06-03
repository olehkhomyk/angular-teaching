import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Appointment } from '../../../../core/models/patient.model';
import { AppointmentStatusBadgeComponent } from '../../../../shared/ui/appointment-status-badge/appointment-status-badge.component';

@Component({
  selector: 'app-appointment-header',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    MatIconModule,
    MatButtonModule,
    AppointmentStatusBadgeComponent,
  ],
  templateUrl: './appointment-header.html',
  styleUrl: './appointment-header.scss',
})
export class AppointmentHeaderComponent {
  appointment = input.required<Appointment>();
  isEditing = input(false);

  editClick = output<void>();
  cancelClick = output<void>();
}
