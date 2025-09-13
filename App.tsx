import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/app-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAxiosInstance } from './src/api/axios';
import { ShiftsProvider } from './src/context/shifts-context';
import { StatusBar } from 'react-native';
import { theme } from './src/styles/color-varibles';

export default function App() {
  useEffect(() => {
    createAxiosInstance();
  }, []);

  return (
    <SafeAreaProvider>
      <ShiftsProvider>
        <StatusBar barStyle="light-content" backgroundColor={theme.white} />
        <AppNavigator />
      </ShiftsProvider>
    </SafeAreaProvider>
  );
}
