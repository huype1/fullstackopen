import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return patients;
};
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};
const addPatients = (entry: NewPatientEntry): PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id,
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;

};
export default {
  getEntries,
  getNonSensitiveEntries,
  addPatients
};
