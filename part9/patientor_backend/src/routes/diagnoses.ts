import express from 'express';
import diagnoseService from '../services/diagnoseService';
import { DiagnoseEntry } from '../types';
import { Response } from 'express';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnoseEntry[]>) => {
  res.send(diagnoseService.getEntries());
});


export default router;