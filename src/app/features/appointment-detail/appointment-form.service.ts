import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConsultationForm, ExaminationForm, PatientInfoForm, SurgeryForm } from '../../core/models/patient.model';

interface FormsSnapshot {
  patientInfo: PatientInfoForm;
  consultation: ConsultationForm;
  examination: ExaminationForm;
  surgery: SurgeryForm;
}

@Injectable()
export class AppointmentFormService {
  private fb = inject(FormBuilder);

  patientInfoForm = this.fb.group({
    isPresent: [false],
    consentSigned: [false],
    temperature: [null as number | null],
    allergies: [[] as string[]],
  });

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

  private snapshot: FormsSnapshot | null = null;

  get medications(): FormArray {
    return this.consultationForm.controls.medications as FormArray;
  }

  get examResults(): FormArray<FormGroup> {
    return this.examinationForm.controls.results as FormArray<FormGroup>;
  }

  get surgicalTeam(): FormArray {
    return this.surgeryForm.controls.surgicalTeam as FormArray;
  }

  snapshotForms(): void {
    this.snapshot = {
      patientInfo: this.patientInfoForm.getRawValue() as PatientInfoForm,
      consultation: this.consultationForm.getRawValue() as ConsultationForm,
      examination: this.examinationForm.getRawValue() as ExaminationForm,
      surgery: this.surgeryForm.getRawValue() as SurgeryForm,
    };
  }

  resetToSnapshot(): void {
    if (!this.snapshot) return;

    const s = this.snapshot;

    this.patientInfoForm.reset(s.patientInfo);

    const { medications, needsFollowUp, followUpDays, visitReason, complaints, diagnosis } = s.consultation;
    this.consultationForm.reset({ visitReason, complaints, diagnosis, needsFollowUp, followUpDays });
    this.refillArray(this.medications, medications, v => this.fb.control(v));

    const { results, ...examScalars } = s.examination;
    this.examinationForm.reset(examScalars);
    this.refillArray(this.examResults, results, r => this.fb.group({ name: [r.name], value: [r.value], norm: [r.norm] }));

    const { surgicalTeam, ...surgeryScalars } = s.surgery;
    this.surgeryForm.reset(surgeryScalars);
    this.refillArray(this.surgicalTeam, surgicalTeam, v => this.fb.control(v));
  }

  private refillArray<T>(array: FormArray, values: T[], factory: (v: T) => ReturnType<FormBuilder['control']> | FormGroup): void {
    array.clear({ emitEvent: false });
    values.forEach(v => array.push(factory(v), { emitEvent: false }));
  }
}
