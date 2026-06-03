import { Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AppointmentStatus } from '../../../core/models/patient.model';

@Component({
  selector: 'app-appointment-status-badge',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './appointment-status-badge.component.html',
  styles: [`
    mat-chip { font-size: 11px !important; font-weight: 700 !important; height: 22px !important; border-radius: 6px !important; letter-spacing: 0.2px; }
    .chip-scheduled   { --mdc-chip-label-text-color: #1d4ed8; --mdc-chip-container-color: #dbeafe; }
    .chip-in-progress { --mdc-chip-label-text-color: #c2410c; --mdc-chip-container-color: #ffedd5; }
    .chip-completed   { --mdc-chip-label-text-color: #166534; --mdc-chip-container-color: #dcfce7; }
    .chip-cancelled   { --mdc-chip-label-text-color: #991b1b; --mdc-chip-container-color: #fee2e2; }
  `],
})
export class AppointmentStatusBadgeComponent {
  status = input.required<AppointmentStatus>();

  label = computed(() => ({
    scheduled:   'Заплановано',
    'in-progress': 'В процесі',
    completed:   'Завершено',
    cancelled:   'Скасовано',
  })[this.status()]);

  chipClass = computed(() => `chip-${this.status()}`);
}
