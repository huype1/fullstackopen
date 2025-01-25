import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
const app = express();
import diaryRouter from './routes/diaries';
import os from 'os';
app.use(express.json());
app.use(helmet());
app.use(cors());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.env.UV_THREADPOOL_SIZE = os.cpus().length;
const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});