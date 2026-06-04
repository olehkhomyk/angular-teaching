import { Component, inject, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AppointmentStatus, AppointmentType, PatientType } from '../../../../core/models/patient.model';

export interface AppointmentsFilter {
  appointmentType: AppointmentType | null;
  patientType: PatientType | null;
  status: AppointmentStatus | null;
}

@Component({
  selector: 'app-appointments-filter',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './appointments-filter.component.html',
  styleUrl: './appointments-filter.component.scss',
})
export class AppointmentsFilterComponent implements OnInit {
  filterChange = output<AppointmentsFilter>();

  private fb = inject(FormBuilder);

  readonly appointmentTypes = [
    { value: AppointmentType.Consultation, label: 'Консультація' },
    { value: AppointmentType.Examination, label: 'Обстеження' },
    { value: AppointmentType.Surgery, label: 'Операція' },
  ];

  readonly patientTypes = [
    { value: PatientType.Regular, label: 'Звичайний' },
    { value: PatientType.Military, label: 'Військовий' },
  ];

  readonly statuses: { value: AppointmentStatus; label: string }[] = [
    { value: 'in-progress', label: 'В процесі' },
    { value: 'completed', label: 'Завершено' },
    { value: 'scheduled', label: 'Заплановано' },
    { value: 'cancelled', label: 'Скасовано' },
  ];

  form = this.fb.group({
    appointmentType: [null as AppointmentType | null],
    patientType: [null as PatientType | null],
    status: [null as AppointmentStatus | null],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe(v => {
      this.filterChange.emit({
        appointmentType: v.appointmentType ?? null,
        patientType: v.patientType ?? null,
        status: v.status ?? null,
      });
    });
  }
}
