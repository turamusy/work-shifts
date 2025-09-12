import { IShift } from "./shift";

export interface IShiftsStore {
  shifts: IShift[];
  loading: boolean;
  error: string | null;
  lastCoords: { lat: number; lon: number } | null;
};