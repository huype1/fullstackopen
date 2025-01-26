import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
// import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { Entry, NewPatientEntry, PatientEntry } from '../types'
import {z} from 'zod';
import { EntrySchema, NewPatientEntrySchema } from '../utils'

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getEntries());
});
router.get('/:id', (req, res: Response) => {
  const result = patientService.getPatient(req.params.id);
  if (!result) {
    res.status(404).send('Patient not found');
  }
  res.send(result);
});
//middleware for post request
const newPatientParser= (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  }
  next(error);
};

router.post('/:id/entries', newEntryParser, (req: Request<{id: string},unknown,Entry>, res) => {
  console.log("works lil nigga");
    const result = patientService.addEntry(req.body, req.params.id);
    res.json(result);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatients(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;