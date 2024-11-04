// src/navigators/SearchStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import MovieScreen from '../screens/MovieScreen';

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Movie" component={MovieScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
