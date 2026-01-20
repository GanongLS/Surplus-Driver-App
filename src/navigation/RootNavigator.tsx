import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import DetailOrderScreen from '../screens/DetailOrderScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  DetailOrder: { orderId: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="DetailOrder" component={DetailOrderScreen} />
    </Stack.Navigator>
  );
}
