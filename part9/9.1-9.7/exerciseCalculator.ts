import handleArguments from './utils'
type ratingRange = 1 | 2 | 3;
interface exerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: ratingRange,
  ratingDescription: string,
  target: number,
  average: number,
}
function calculateExercise(hours: number[], target: number): exerciseResults {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((next, curr) => next + curr, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : (target - average) <= 1 ? 2 : 1;
  const ratingDescription = rating === 3 ? "You're reaching your goals!" : rating === 2 ? 'not too bad but could be better' : 'This is horrendous';
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}
const [target, ...hours] = handleArguments(process.argv);
console.log(calculateExercise(hours, target));