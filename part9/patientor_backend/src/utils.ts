import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  //for normal string and new String() typeof string
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseStringType = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect type of input');
  }
  return text;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object ) {

    return {
      name: parseStringType(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringType(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseStringType(object.occupation)
    };;
  }
  throw new Error('Incorrect data: some field is missing');
};