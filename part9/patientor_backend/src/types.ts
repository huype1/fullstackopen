import { NewEntrySchema } from './utils';
import {z} from 'zod';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}
export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = z.infer<typeof NewEntrySchema>;