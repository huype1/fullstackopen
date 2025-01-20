export const handleArguments = (args: string[]): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments');
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('Input values needed to be numbers!');
  }
  return args.slice(2).map(arg => Number(arg));
};
export default handleArguments;