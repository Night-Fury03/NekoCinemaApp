
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftScreen from '../screens/GiftScreen';

const Stack = createNativeStackNavigator();

export default function GiftStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gift" component={GiftScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
