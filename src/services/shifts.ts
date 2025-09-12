import { AxiosError } from 'axios';
import { instance } from '../api/axios';
import { API_ENDPOINTS } from '../constants/api';
import { IShift } from '../interfaces/shift';
import { TEXTS } from '../constants/texts';

export async function fetchShifts(lat: number, lon: number): Promise<IShift[]> {
  try {
    const { data }: { data: { data: IShift[] } } = await instance.get(
      API_ENDPOINTS.SHIFTS,
      {
        params: { latitude: lat, longitude: lon },
      },
    );
    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(TEXTS.COULD_NOT_GET_SHIFTS, {
      message: axiosError.message,
      status: axiosError.response?.status,
      data: axiosError.response?.data,
    });
    
    const errorMessage = axiosError.response
      ? `${TEXTS.COULD_NOT_GET_SHIFTS} ${axiosError.response?.status} - ${axiosError.message || TEXTS.UNKNOWN_ERROR}`
      : TEXTS.SELECTING_SHIFTS_ERROR;
    
    throw new Error(errorMessage);
  }
}
