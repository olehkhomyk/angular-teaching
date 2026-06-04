import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Appointment, PatientInfoForm, PatientType } from '../../../../core/models/patient.model';

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
    MatButtonModule,
  ],
  templateUrl: './patient-info.component.html',
  styleUrl: './patient-info.component.scss',
})
export class PatientInfoComponent {
  appointment = input.required<Appointment>();

  save = output<PatientInfoForm>();

  private fb = inject(FormBuilder);

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];

  patientType = computed<PatientType>(() => this.appointment().patient.patientType);

  isEditing = signal(false);

  form: FormGroup = this.buildForm()

  private snapshot: ReturnType<typeof this.form.getRawValue> | null = null;

  constructor() {
    this.form.disable();
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue();
    this.form.enable();
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    if (this.snapshot) this.form.reset(this.snapshot);
    this.form.disable();
    this.isEditing.set(false);
  }

  onSave(): void {
    this.save.emit(this.form.value);
    this.form.disable();
    this.isEditing.set(false);
  }

  buildForm(): any {
    switch (this.patientType()) {
      case PatientType.Military:
        return this.fb.group({
        isPresent: [false],
        consentSigned: [false],
        temperature: [null as number | null],
        allergies: [[] as string[]],
        combatInjuries: [''],
        psychologicalState: [''],
      });
      default:
        return this.fb.group({
          isPresent: [false],
          consentSigned: [false],
          temperature: [null as number | null],
          allergies: [[] as string[]],
          combatInjuries: [''],
          psychologicalState: [''],
        });
    }
  };
}
