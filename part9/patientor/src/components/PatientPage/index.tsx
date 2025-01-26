import { Diagnosis, Gender, Patient, Entry } from '../../types.ts';
import {useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import patientService from '../../services/patients.ts';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HospitalVisit from './HospitalVisit.tsx';
import HealthCheck from './HealthCheck.tsx';
import OccupationalHealthCare from './OccupationalHealthCare.tsx';
import {Button, Box} from "@mui/material";
import EntryForm from './EntryForm.tsx';

interface Props {
  diagnoses: Diagnosis[];
}
interface VisibleButtons {
  hospital: boolean,
  occupationalCheck: boolean,
  healthCheck: boolean,
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type of patient: ${JSON.stringify(value)}`
  );
};

const PatientPage = ({diagnoses} : Props) => {
  const id =  useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  const [visible, setVisible] = useState<VisibleButtons>({
    hospital: false,
    occupationalCheck: false,
    healthCheck: false
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [entryType, setEntryType] = useState<string>("");


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
  }, [id, visible]);
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
  const handleOpenModal = (type: string) => {
    setEntryType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("HealthCheck")}
      >
        Add Health Check Entry
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("OccupationalHealthcare")}
      >
        Add Occupational Check Entry
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenModal("Hospital")}
      >
        Add Hospital Entry
      </Button>
    </Box>
    <EntryForm
      patientId={patient.id}
      type={entryType}
      callback={() => setVisible({ ...visible })}
      diagnoses={diagnoses}
      open={modalOpen}
      onClose={handleCloseModal}
    />
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