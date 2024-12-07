
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from '../screens/FavoriteScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import BookingScreen from '../screens/BookingScreen';

const Stack = createNativeStackNavigator();

export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorite" component={FavoriteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Movie" component={MovieScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
