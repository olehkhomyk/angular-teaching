import { Component, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Appointment, ConsultationForm } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './consultation-form.html',
  styleUrl: './consultation-form.scss',
})
export class ConsultationFormComponent {
  appointment = input.required<Appointment>();
  save = output<ConsultationForm>();

  private fb = inject(FormBuilder);

  isEditing = false;

  form = this.fb.group({
    visitReason: [''],
    complaints: [''],
    diagnosis: [''],
    medications: this.fb.array<string>([]),
    needsFollowUp: [false],
    followUpDays: [null as number | null],
  });

  private snapshot: ConsultationForm | null = null;

  get medications(): FormArray {
    return this.form.controls.medications as FormArray;
  }

  constructor() {
    this.form.disable();
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue() as ConsultationForm;
    this.form.enable();
    this.isEditing = true;
  }

  cancelEditing(): void {
    if (this.snapshot) {
      const { medications, ...scalars } = this.snapshot;
      this.form.reset(scalars);
      this.medications.clear({ emitEvent: false });
      medications.forEach(v => this.medications.push(this.fb.control(v), { emitEvent: false }));
    }
    this.form.disable();
    this.isEditing = false;
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue() as ConsultationForm);
    this.form.disable();
    this.isEditing = false;
  }

  addMedication(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.medications.push(this.fb.control(value));
      input.value = '';
    }
  }

  removeMedication(index: number): void {
    this.medications.removeAt(index);
  }
}
