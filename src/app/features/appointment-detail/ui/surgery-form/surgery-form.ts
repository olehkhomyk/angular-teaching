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
import { Appointment, SurgeryForm } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-surgery-form',
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
  templateUrl: './surgery-form.html',
  styleUrl: './surgery-form.scss',
})
export class SurgeryFormComponent {
  appointment = input.required<Appointment>();
  save = output<SurgeryForm>();

  private fb = inject(FormBuilder);

  isEditing = false;

  form = this.fb.group({
    anesthesiaType: [''],
    durationMinutes: [null as number | null],
    operatingRoom: [''],
    isFasting: [false],
    documentsSigned: [false],
    transferredToWard: [false],
    surgicalTeam: this.fb.array<string>([]),
    postOpInstructions: [''],
  });

  private snapshot: SurgeryForm | null = null;

  get surgicalTeam(): FormArray {
    return this.form.controls.surgicalTeam as FormArray;
  }

  constructor() {
    this.form.disable();
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue() as SurgeryForm;
    this.form.enable();
    this.isEditing = true;
  }

  cancelEditing(): void {
    if (this.snapshot) {
      const { surgicalTeam, ...scalars } = this.snapshot;
      this.form.reset(scalars);
      this.surgicalTeam.clear({ emitEvent: false });
      surgicalTeam.forEach(v => this.surgicalTeam.push(this.fb.control(v), { emitEvent: false }));
    }
    this.form.disable();
    this.isEditing = false;
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue() as SurgeryForm);
    this.form.disable();
    this.isEditing = false;
  }

  addTeamMember(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.surgicalTeam.push(this.fb.control(value));
      input.value = '';
    }
  }

  removeTeamMember(index: number): void {
    this.surgicalTeam.removeAt(index);
  }
}
