import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import PayScreen from '../screens/PayScreen';
import CompleteSreen from '../screens/CompleteSreen';
import MyTicketsScreen from '../screens/MyTicketsScreen';

const Stack = createNativeStackNavigator();

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Pay" component={PayScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Complete" component={CompleteSreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyTickets" component={MyTicketsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
}

