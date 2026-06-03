import { Component, computed, effect, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Appointment, ConsultationForm, ExaminationForm, SurgeryForm } from '../../../../core/models/patient.model';
import { AppointmentFormService } from '../../appointment-form.service';
import { NgTemplateOutlet } from '@angular/common';

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
    NgTemplateOutlet,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  appointment = input.required<Appointment>();
  isEditing = input<boolean>(false);
  save = output<ConsultationForm | ExaminationForm | SurgeryForm>();

  type = computed(() => this.appointment().type);

  formService = inject(AppointmentFormService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.formService.examinationForm.controls.resultsReceived.valueChanges.subscribe((received) => {
      if (!received) {
        this.formService.examinationForm.controls.conclusion.reset('');
      }
    });
  }

  readonly examResultColumns = ['name', 'value', 'norm', 'actions'];

  addMedication(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.formService.medications.push(this.fb.control(value));
      input.value = '';
    }
  }

  removeMedication(index: number): void {
    this.formService.medications.removeAt(index);
  }

  addExamResult(): void {
    this.formService.examResults.push(this.fb.group({ name: [''], value: [''], norm: [''] }));
  }

  removeExamResult(index: number): void {
    this.formService.examResults.removeAt(index);
  }

  addTeamMember(input: HTMLInputElement): void {
    const value = input.value.trim();
    if (value) {
      this.formService.surgicalTeam.push(this.fb.control(value));
      input.value = '';
    }
  }

  removeTeamMember(index: number): void {
    this.formService.surgicalTeam.removeAt(index);
  }

  onSubmit(): void {
    const data = this.prepareAppointmentPayload();
    this.save.emit(data);
  }

  private prepareAppointmentPayload(): ConsultationForm | ExaminationForm | SurgeryForm {
    const type = this.appointment()!.type;

    let payload;

    if (type === 'consultation') {
      payload = this.formService.consultationForm.getRawValue() as ConsultationForm;
    } else if (type === 'examination') {
      payload = this.formService.examinationForm.getRawValue() as ExaminationForm;
    } else {
      payload = this.formService.surgeryForm.getRawValue() as SurgeryForm;
    }

    return payload;
  }
}
