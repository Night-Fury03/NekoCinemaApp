
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
