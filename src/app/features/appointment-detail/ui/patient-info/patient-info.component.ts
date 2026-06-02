import { Component, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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

  isPresent = signal(false);
  consentSigned = signal(false);
  temperature = signal<number | null>(null);
  selectedAllergies = signal<string[]>([]);

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];

  setIsPresent(val: boolean): void {
    this.isPresent.set(val);
  }

  setConsentSigned(val: boolean): void {
    this.consentSigned.set(val);
  }

  setAllergies(val: string[]): void {
    this.selectedAllergies.set(val);
  }

  setTemperature(val: string): void {
    const num = parseFloat(val);
    this.temperature.set(isNaN(num) ? null : num);
  }
}
