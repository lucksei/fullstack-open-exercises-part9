import axios from 'axios';
const baseUrl = '/api/diaries';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addDiaryEntry = async (newDiaryEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry);
  return response.data;
};

export default { getDiaries, addDiaryEntry };
