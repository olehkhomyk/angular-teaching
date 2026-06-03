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
import { SurgeryForm } from '../../../../core/models/patient.model';

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
  isEditing = input(false);
  save = output<SurgeryForm>();

  formService = inject(AppointmentFormService);
  private fb = inject(FormBuilder);

  get form() { return this.formService.surgeryForm; }
  get surgicalTeam() { return this.formService.surgicalTeam; }

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
    this.save.emit(this.form.getRawValue() as SurgeryForm);
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
