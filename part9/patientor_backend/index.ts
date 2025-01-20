import express from 'express';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Ping endpoint called');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server runnning on port http://localhost:${PORT}`);
});
