import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/root-stack-param';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION } from '../types/navigation-routes';
import HomeScreen from '../screens/home/home-screen';
import DetailsScreen from '../screens/details/details-screen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NAVIGATION.HOME}component={HomeScreen} />
        <Stack.Screen name={NAVIGATION.DETAILS}component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}