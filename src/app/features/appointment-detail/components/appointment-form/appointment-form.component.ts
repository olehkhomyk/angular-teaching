import { Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

interface ExamResult {
  name: string;
  value: string;
  norm: string;
}

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    FormsModule,
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
export class AppointmentFormComponent {
  appointment = input.required<Appointment>();

  type = computed(() => this.appointment().type);

  // ── Consultation ──────────────────────────────────────────────
  visitReason = signal('');
  complaints = signal('');
  diagnosis = signal('');
  medications = signal<string[]>([]);
  needsFollowUp = signal(false);
  followUpDays = signal<number | null>(null);

  // ── Examination ───────────────────────────────────────────────
  examinationType = signal('');
  isFasting = signal(false);
  referralNumber = signal('');
  examResults = signal<ExamResult[]>([]);
  resultsReceived = signal(false);
  conclusion = signal('');

  // ── Surgery ───────────────────────────────────────────────────
  anesthesiaType = signal('');
  durationMinutes = signal<number | null>(null);
  surgeryIsFasting = signal(false);
  documentsSigned = signal(false);
  surgicalTeam = signal<string[]>([]);
  operatingRoom = signal('');
  postOpInstructions = signal('');
  transferredToWard = signal(false);

  // ── Chip helpers ──────────────────────────────────────────────
  addMedication(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.medications.update(m => [...m, value]);
      input.value = '';
    }
  }

  removeMedication(index: number): void {
    this.medications.update(m => m.filter((_, i) => i !== index));
  }

  addTeamMember(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.surgicalTeam.update(t => [...t, value]);
      input.value = '';
    }
  }

  removeTeamMember(index: number): void {
    this.surgicalTeam.update(t => t.filter((_, i) => i !== index));
  }

  // ── Exam results table ────────────────────────────────────────
  readonly examResultColumns = ['name', 'value', 'norm', 'actions'];

  addExamResult(): void {
    this.examResults.update(r => [...r, { name: '', value: '', norm: '' }]);
  }

  removeExamResult(index: number): void {
    this.examResults.update(r => r.filter((_, i) => i !== index));
  }

  updateExamResult(index: number, field: keyof ExamResult, value: string): void {
    this.examResults.update(r =>
      r.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  }

  setDuration(val: string): void {
    const num = parseInt(val, 10);
    this.durationMinutes.set(isNaN(num) ? null : num);
  }
}
