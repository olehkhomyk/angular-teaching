import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Appointment } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
})
export class PatientInfoComponent {
  appointment = input.required<Appointment>();

  private fb = inject(FormBuilder);

  patientInfoForm = this.fb.group({
    isPresent: [false],
    consentSigned: [false],
    temperature: [null as number | null],
    selectedAllergies: [[] as string[]],
  });

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];
}