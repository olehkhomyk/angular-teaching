import { Component, computed, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Appointment, PatientInfoForm, PatientType } from '../../../../core/models/patient.model';

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

  save = output<PatientInfoForm>();

  private fb = inject(FormBuilder);

  readonly allergyOptions = ['Пеніцилін', 'Латекс', 'Йод', 'Немає'];

  patientType = computed<PatientType>(() => this.appointment().patient.patientType);

  isEditing = false;

  form: FormGroup = this.fb.group({
    isPresent: [false],
    consentSigned: [false],
    temperature: [null as number | null],
    allergies: [[] as string[]],
    combatInjuries: [''],
    psychologicalState: [''],
    evacuationCardSigned: [false],
  });

  private snapshot: ReturnType<typeof this.form.getRawValue> | null = null;

  constructor() {
    this.form.disable();
  }

  startEditing(): void {
    this.snapshot = this.form.getRawValue();
    this.form.enable();
    this.isEditing = true;
  }

  cancelEditing(): void {
    if (this.snapshot) this.form.reset(this.snapshot);
    this.form.disable();
    this.isEditing = false;
  }

  onSave(): void {
    this.save.emit(this.buildPayload());
    this.form.disable();
    this.isEditing = false;
  }

  private buildPayload(): PatientInfoForm {
    const v = this.form.getRawValue();
    const base = {
      patientType: this.patientType(),
      isPresent: v.isPresent,
      allergies: v.allergies,
      temperature: v.temperature,
      consentSigned: v.consentSigned,
    };

    switch (this.patientType()) {
      case PatientType.Military:
        return {
          ...base,
          combatInjuries: v.combatInjuries,
          psychologicalState: v.psychologicalState,
          evacuationCardSigned: v.evacuationCardSigned,
        };
      default:
        return base;
    }
  }

  // TODO: refactor — abstract BasePatientInfoComponent
  // TODO: MilitaryPatientInfoComponent extends Base
  // TODO: ChildPatientInfoComponent extends Base
  // TODO: PatientInfoHostComponent — dynamically resolves correct child via NgComponentOutlet
}
