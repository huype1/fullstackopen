import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  } else {
    const result = calculateBmi(height, weight);
    res.json({
      weight: weight,
      height: height,
      bmi: result
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  const hours = daily_exercises as number[];
  if (!hours || !target) {
    res.json({ error: 'parameters missing' });
  }
  if (isNaN(Number(target)) || hours.every(hour => isNaN(Number(hour))) ) {
    res.json({ error: 'malformatted parameters' });
  }
  const result = calculateExercise(hours, Number(target));
  res.send(result);
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});