import {z} from 'zod';
import { Gender, NewPatientEntry } from './types';

export const NewEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(z.object({})),

});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewEntrySchema.parse(object);
};