import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppointmentFormService } from '../../appointment-form.service';
import { ExaminationForm } from '../../../../core/models/patient.model';

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
  isEditing = input(false);
  save = output<ExaminationForm>();

  formService = inject(AppointmentFormService);
  private fb = inject(FormBuilder);

  readonly examResultColumns = ['name', 'value', 'norm', 'actions'];

  get form() { return this.formService.examinationForm; }
  get examResults() { return this.formService.examResults; }

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    });

    this.formService.examinationForm.controls.resultsReceived.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(received => {
        if (!received) {
          this.formService.examinationForm.controls.conclusion.reset('', { emitEvent: false });
        }
      });
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue() as ExaminationForm);
  }

  addExamResult(): void {
    this.examResults.push(this.fb.group({ name: [''], value: [''], norm: [''] }));
  }

  removeExamResult(index: number): void {
    this.examResults.removeAt(index);
  }
}
