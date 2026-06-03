import { Component, effect, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Appointment, PatientInfoForm } from '../../../../core/models/patient.model';
import { AppointmentFormService } from '../../appointment-form.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

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
export class PatientInfoComponent {
  appointment = input.required<Appointment>();
  isEditing = input(false);

  save = output<PatientInfoForm>();

  private formService = inject(AppointmentFormService);

  get form(): FormGroup {
    return this.formService.patientInfoForm;
  }

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];

  constructor() {
    toObservable(this.isEditing)
      .pipe(
        tap((editMode: boolean) => {
          if (editMode) {
            this.formService.patientInfoForm.enable();
          } else {
            this.formService.patientInfoForm.disable();
          }
        }),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  onSave(): void {
    this.save.emit(this.formService.patientInfoForm.getRawValue() as PatientInfoForm);
  }
}
