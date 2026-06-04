import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
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
export class PatientInfoComponent implements OnInit {
  appointment = input.required<Appointment>();

  save = output<PatientInfoForm>();

  private fb = inject(FormBuilder);

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];
  readonly PatientTypeEnum: typeof PatientType = PatientType;

  patientType = computed<PatientType>(() => this.appointment().patient.patientType);

  isEditing = signal(false);

  form!: FormGroup;

  private snapshot: ReturnType<typeof this.form.getRawValue> | null = null;

  ngOnInit(): void {
    this.buildForm();
    this.editableControls.forEach(name => this.form.get(name)?.disable());
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue();
    this.editableControls.forEach(name => this.form.get(name)?.enable());
    this.isEditing.set(true);
  }

  cancelEditing(): void {
    if (this.snapshot) this.form.reset(this.snapshot);
    this.editableControls.forEach(name => this.form.get(name)?.disable());
    this.isEditing.set(false);
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue());
    this.editableControls.forEach(name => this.form.get(name)?.disable());
    this.isEditing.set(false);
  }

  private readonly editableControls = [
    'isPresent', 'consentSigned', 'temperature', 'allergies',
    'combatInjuries', 'psychologicalState',
  ];

  buildForm(): void {
    const a = this.appointment();
    this.form = this.fb.group({
      insuranceNumber: [{ value: a.patient.insuranceNumber, disabled: true }],
      previousNotes: [{ value: a.previousNotes, disabled: true }],
      isPresent: [false],
      consentSigned: [false],
      temperature: [null as number | null],
      allergies: [[] as string[]],
      combatInjuries: [''],
      psychologicalState: [''],
    });
  }
}
