import { Component, input, output } from '@angular/core';
import { Appointment, AppointmentType, ConsultationForm, ExaminationForm, SurgeryForm } from '../../../../core/models/patient.model';
import { ConsultationFormComponent } from '../consultation-form/consultation-form';
import { ExaminationFormComponent } from '../examination-form/examination-form';
import { SurgeryFormComponent } from '../surgery-form/surgery-form';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [ConsultationFormComponent, ExaminationFormComponent, SurgeryFormComponent],
  templateUrl: './appointment-form.html',
})
export class AppointmentFormComponent {
  appointment = input.required<Appointment>();
  save = output<ConsultationForm | ExaminationForm | SurgeryForm>();

  readonly AppointmentType = AppointmentType;
}
