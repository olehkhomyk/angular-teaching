import { Component, computed, inject, input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Appointment } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-appointment-form',
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
    MatTableModule,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  appointment = input.required<Appointment>();

  type = computed(() => this.appointment().type);

  private fb = inject(FormBuilder);

  consultationForm = this.fb.group({
    visitReason: [''],
    complaints: [''],
    diagnosis: [''],
    medications: this.fb.array<string>([]),
    needsFollowUp: [false],
    followUpDays: [null as number | null],
  });

  examinationForm = this.fb.group({
    examinationType: [''],
    isFasting: [false],
    referralNumber: [''],
    resultsReceived: [false],
    conclusion: [''],
    results: this.fb.array<FormGroup>([]),
  });

  surgeryForm = this.fb.group({
    anesthesiaType: [''],
    durationMinutes: [null as number | null],
    operatingRoom: [''],
    isFasting: [false],
    documentsSigned: [false],
    transferredToWard: [false],
    surgicalTeam: this.fb.array<string>([]),
    postOpInstructions: [''],
  });

  ngOnInit(): void {
    // Disable conclusion when resultsReceived is false
    this.examinationForm.controls.resultsReceived.valueChanges.subscribe(received => {
      if (!received) {
        this.examinationForm.controls.conclusion.reset('');
      }
    });
  }

  // ── Consultation: medications ──────────────────────────────────
  get medications(): FormArray<ReturnType<FormBuilder['control']>> {
    return this.consultationForm.controls.medications as FormArray;
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

  // ── Examination: results table ─────────────────────────────────
  get examResults(): FormArray<FormGroup> {
    return this.examinationForm.controls.results as FormArray<FormGroup>;
  }

  readonly examResultColumns = ['name', 'value', 'norm', 'actions'];

  addExamResult(): void {
    this.examResults.push(
      this.fb.group({ name: [''], value: [''], norm: [''] }),
    );
  }

  removeExamResult(index: number): void {
    this.examResults.removeAt(index);
  }

  // ── Surgery: surgical team ─────────────────────────────────────
  get surgicalTeam(): FormArray<ReturnType<FormBuilder['control']>> {
    return this.surgeryForm.controls.surgicalTeam as FormArray;
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