import axios from 'axios';
const baseUrl = '/api/diaries';
import type { DiaryEntry } from '../types';

const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export default { getDiaries };
