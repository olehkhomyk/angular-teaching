import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentFormService } from '../../appointment-form.service';
import { ConsultationForm } from '../../../../core/models/patient.model';

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
  isEditing = input(false);
  save = output<ConsultationForm>();

  formService = inject(AppointmentFormService);
  private fb = inject(FormBuilder);

  get form() { return this.formService.consultationForm; }
  get medications() { return this.formService.medications; }

  constructor() {
    effect(() => {
      if (this.isEditing()) {
        this.form.enable();
      } else {
        this.form.disable();
      }
    });
  }

  onSave(): void {
    this.save.emit(this.form.getRawValue() as ConsultationForm);
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
