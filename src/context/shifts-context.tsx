import React, { createContext, ReactNode, useContext } from "react";
import { observer } from "mobx-react-lite";
import { shiftsStore } from "../stores/shifts-store";

export const ShiftsContext = createContext(shiftsStore);

export const ShiftsProvider = observer(({ children }: { children: ReactNode}) => (
  <ShiftsContext.Provider value={shiftsStore}>
    {children}
  </ShiftsContext.Provider>
));

export const useShifts = () => useContext(ShiftsContext);