import axios from 'axios';
const baseUrl = '/api/diaries';
import type { DiaryEntry, NewDiaryEntry } from '../types';

const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const addDiaryEntry = async (
  newDiaryEntry: NewDiaryEntry
): Promise<DiaryEntry> => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry);
    return response.data;
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Error ${error.status}: ${error.message}`);
    }
    throw new Error('An unknown error occurred');
  }
};

export default { getDiaries, addDiaryEntry };
