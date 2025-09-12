import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/app-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAxiosInstance } from './src/api/axios';
import { ShiftsProvider } from './src/context/shifts-context';

export default function App() {
  useEffect(() => {
    createAxiosInstance();
  }, []);

  return (
    <SafeAreaProvider>
      <ShiftsProvider>
        <AppNavigator />
      </ShiftsProvider>
    </SafeAreaProvider>
  );
}
