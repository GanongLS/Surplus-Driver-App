import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { OrderProvider } from './context/OrderContext';

export default function App() {
  return (
    <OrderProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </OrderProvider>
  );
}
