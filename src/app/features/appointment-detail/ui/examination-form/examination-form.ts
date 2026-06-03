import { Component, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Appointment, ExaminationForm } from '../../../../core/models/patient.model';

@Component({
  selector: 'app-examination-form',
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
    MatTableModule,
  ],
  templateUrl: './examination-form.html',
  styleUrl: './examination-form.scss',
})
export class ExaminationFormComponent {
  appointment = input.required<Appointment>();
  save = output<ExaminationForm>();

  private fb = inject(FormBuilder);

  readonly examResultColumns = ['name', 'value', 'norm', 'actions'];

  isEditing = false;

  form = this.fb.group({
    examinationType: [''],
    isFasting: [false],
    referralNumber: [''],
    resultsReceived: [false],
    conclusion: [''],
    results: this.fb.array<FormGroup>([]),
  });

  private snapshot: ExaminationForm | null = null;

  get examResults(): FormArray<FormGroup> {
    return this.form.controls.results as FormArray<FormGroup>;
  }

  constructor() {
    this.form.disable();

    this.form.controls.resultsReceived.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(received => {
        if (!received) {
          this.form.controls.conclusion.reset('', { emitEvent: false });
        }
      });
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue() as ExaminationForm;
    this.form.enable();
    this.isEditing = true;
  }

  cancelEditing(): void {
    if (this.snapshot) {
      const { results, ...scalars } = this.snapshot;
      this.form.reset(scalars);
      this.examResults.clear({ emitEvent: false });
      results.forEach(r =>
        this.examResults.push(
          this.fb.group({ name: [r.name], value: [r.value], norm: [r.norm] }),
          { emitEvent: false },
        ),
      );
    }
    this.form.disable();
    this.isEditing = false;
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue() as ExaminationForm);
    this.form.disable();
    this.isEditing = false;
  }

  addExamResult(): void {
    this.examResults.push(this.fb.group({ name: [''], value: [''], norm: [''] }));
  }

  removeExamResult(index: number): void {
    this.examResults.removeAt(index);
  }
}
