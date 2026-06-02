import { Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AppointmentStatus } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-appointment-status-badge',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './appointment-status-badge.component.html',
  styles: [`
    .chip-in-progress { --mdc-chip-label-text-color: #e65100; --mdc-chip-container-color: #fff3e0; }
    .chip-completed   { --mdc-chip-label-text-color: #2e7d32; --mdc-chip-container-color: #e8f5e9; }
    .chip-cancelled   { --mdc-chip-label-text-color: #c62828; --mdc-chip-container-color: #ffebee; }
    .chip-scheduled   { --mdc-chip-label-text-color: #1565c0; --mdc-chip-container-color: #e3f2fd; }
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
