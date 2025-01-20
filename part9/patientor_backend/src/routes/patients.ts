import express from 'express';
import patientService from '../services/patientService';
import { NonSensitivePatientEntry, } from '../types';
import { Response } from 'express';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatients(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong';
    if (error instanceof Error ) {
      errorMessage += 'Error' + error.message;
    }
   res.status(400).send(errorMessage);
  }
});

export default router;