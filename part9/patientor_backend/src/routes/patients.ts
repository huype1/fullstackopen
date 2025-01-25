import express, {Request, Response, NextFunction} from 'express';
import patientService from '../services/patientService';
// import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { PatientEntry } from '../types';
import {z} from 'zod';
// import { NewEntrySchema } from '../utils';

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
// const newPatientParser= (req: Request, _res: Response, next: NextFunction) => {
//   try {
//     NewEntrySchema.parse(req.body);
//     console.log(req.body);
//     next();
//   } catch (error: unknown) {
//     next(error);
//   }
// };

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

// router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
//   const addedEntry = patientService.addPatients(req.body);
//   res.json(addedEntry);
// });

router.use(errorMiddleware);

export default router;