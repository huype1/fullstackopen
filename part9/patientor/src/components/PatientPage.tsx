import { Diagnosis, Gender, Patient, Entry } from '../types.ts';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../services/patients.ts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HospitalVisit from './PatientListPage/HospitalVisit.tsx';
import HealthCheck from './PatientListPage/HealthCheck.tsx';
import OccupationalHealthCare from './PatientListPage/OccupationalHealthCare.tsx';

interface Props {
  diagnoses: Diagnosis[];
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type of patient: ${JSON.stringify(value)}`
  );
};

const PatientPage = ({diagnoses} : Props) => {
  const id =  useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const diagnosisDictionary: { [code: string]: Diagnosis } = {};
  diagnoses.forEach(diagnosis => {
    diagnosisDictionary[diagnosis.code] = diagnosis;
  });
  useEffect(() => {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid id');
    }
    patientService.get(id).then((patient) => {
      if (patient) {
        setPatient(patient);
      }
    });
  }, [id]);
  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalVisit entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthCare entry={entry} />;
      default:
        return assertNever(entry);
    }
  };
  if (!patient) {
    return null;
  }
  return (<>
    <h1>Patientor</h1>
    <div>
      <h2>{patient.name}
      {patient.gender === Gender.Male && <MaleIcon />}
      {patient.gender === Gender.Female && <FemaleIcon />}
      {patient.gender === Gender.Other && <TransgenderIcon />}
      </h2>
    </div>
    <div>
      <p>SSN: {patient.ssn}</p>
    </div>
    <div>
      <p>Occupation: {patient.occupation}</p>
    </div>
    <div>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} {...entry} />
        // <>
        //   <p>{entry.date} {entry.description}</p>
        //   <ul>
        //     {entry.diagnosisCodes?.map(code => {
        //       const diagnoses = diagnosisDictionary[code];
        //       return (
        //         <li key={code}>{code} {diagnoses?.name}</li>
        //       );
        //     }
        //     )}
        //   </ul>
        // </>
      )
      )}
    </div>
  </>);

};
export default PatientPage;