import axios from 'axios';
import { Diary, newDiary } from './types.ts'

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries =  async () => {
  //got to implicitly imply that data is Diary type not just from axios return type
  return axios.get<Diary[]>(baseUrl).then(response=> response.data);
}

export const createDiary = async (object: newDiary) => {
  return axios.post<Diary>(baseUrl, object).then(response => response.data);
}