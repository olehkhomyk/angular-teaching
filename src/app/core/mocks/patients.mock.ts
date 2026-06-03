import { Patient, PatientType } from '../models/patient.model';

export const PATIENTS_MOCK: Patient[] = [
  { id: 'p1', firstName: 'Олена', lastName: 'Коваль', age: 34, insuranceNumber: 'UA-2021-001', patientType: PatientType.Regular },
  { id: 'p2', firstName: 'Микола', lastName: 'Бондаренко', age: 52, insuranceNumber: 'UA-2019-047', patientType: PatientType.Military },
  { id: 'p3', firstName: 'Sofiya', lastName: 'Melnyk', age: 28, insuranceNumber: 'UA-2022-118', patientType: PatientType.Regular },
  { id: 'p4', firstName: 'Іван', lastName: 'Шевченко', age: 61, insuranceNumber: 'UA-2018-305', patientType: PatientType.Regular },
  { id: 'p5', firstName: 'Анна', lastName: 'Петренко', age: 45, insuranceNumber: 'UA-2020-213', patientType: PatientType.Military },
  { id: 'p6', firstName: 'Dmytro', lastName: 'Kravchenko', age: 39, insuranceNumber: 'UA-2023-009', patientType: PatientType.Regular },
  { id: 'p7', firstName: 'Наталія', lastName: 'Лисенко', age: 72, insuranceNumber: 'UA-2017-444', patientType: PatientType.Regular },
  { id: 'p8', firstName: 'Олексій', lastName: 'Гриценко', age: 19, insuranceNumber: 'UA-2024-077', patientType: PatientType.Military },
  { id: 'p9', firstName: 'Марина', lastName: 'Захаренко', age: 56, insuranceNumber: 'UA-2016-891', patientType: PatientType.Military },
  { id: 'p10', firstName: 'Viktor', lastName: 'Savchenko', age: 43, insuranceNumber: 'UA-2021-632', patientType: PatientType.Regular },
];
