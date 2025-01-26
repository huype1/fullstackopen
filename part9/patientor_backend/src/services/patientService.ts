import patients  from '../../data/patients';
import { Entry, EntryWithoutId, NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types'
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

const getPatient = (id: string): PatientEntry | undefined=> {
  const patient = patients.find(p=> p.id === id);
  return patient;
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
const addEntry = (entry: EntryWithoutId, patientId: string ): Entry =>  {
  const id = uuid();
  const newEntry = {
    id,
    ...entry
  };
  const patient = patients.find(p=> p.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  addPatients,
  addEntry,
};
