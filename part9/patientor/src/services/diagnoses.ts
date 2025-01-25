import { apiBaseUrl } from '../constants.ts';
import { Diagnosis } from '../types.ts';
import axios from 'axios';

const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

export default { getAll };