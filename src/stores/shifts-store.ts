import { makeAutoObservable, runInAction } from "mobx";
import { fetchShifts } from "../services/shifts";
import { IShiftsStore } from "../interfaces/shift-store";
import { IShift } from "../interfaces/shift";
import { TEXTS } from "../constants/texts";

class ShiftsStore implements IShiftsStore {
  shifts: IShift[] = [];
  loading = false;
  error: string | null = null;
  lastCoords: { lat: number; lon: number } | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(lat: number, lon: number) {
    if (
      this.lastCoords &&
      this.lastCoords.lat === lat &&
      this.lastCoords.lon === lon &&
      this.shifts.length > 0
    ) {
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      const data = await fetchShifts(lat, lon);
      // const data = await fetchShifts(55.991349, 37.834919);

      console.log('Все гуд!', data)
  
      runInAction(() => {
        this.shifts = Array.isArray(data) ? data : [];
        this.lastCoords = { lat, lon };
        this.loading = false;
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e?.message ?? TEXTS.UNKNOWN_ERROR;
        this.loading = false;
      });
    }
  }

  getById(id: string | number) {
    return this.shifts.find((item) => String(item.id) === String(id)) || null;
  }
}

export const shiftsStore = new ShiftsStore();
