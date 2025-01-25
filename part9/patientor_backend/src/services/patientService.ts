import patients, { data } from '../../data/patients'
import {  NonSensitivePatientEntry, PatientEntry } from '../types';
// import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
  return data;
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

const getPatient = (id: string):PatientEntry | undefined=> {
  const patient = data.find(p=> p.id === id);
  return patient;
};

// const addPatients = (entry: NewPatientEntry): PatientEntry => {
//   const id = uuid();
//   const newPatientEntry = {
//     id,
//     ...entry
//   };
//
//   patients.push(newPatientEntry);
//   return newPatientEntry;
//
// };
export default {
  getEntries,
  getNonSensitiveEntries,
  getPatient,
  // addPatients
};
