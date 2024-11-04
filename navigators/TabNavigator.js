import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import GiftStack from './GiftStack';
import ProfileStack from './ProfileStack';
import { HeartIcon, HomeIcon, GiftIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";


const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconColor = focused ? '#FD9564' : '#9e9e9e';
                if (route.name === 'HomeTab') {
                    return <HomeIcon size={focused ? 36 : 28} color={iconColor} />;
                } else if (route.name === 'FavoriteTab') {
                    return <HeartIcon size={focused ? 36 : 28} color={iconColor} />;
                } else if (route.name === 'GiftTab') {
                    return <GiftIcon size={focused ? 36 : 28} color={iconColor} />;
                } else if (route.name === 'ProfileTab') {
                    return <UserIcon size={focused ? 36 : 28} color={iconColor} />;
                }
            },
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1C2743',
            },
            headerShown: false
        })}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        // Ngăn chặn hành vi điều hướng mặc định
                        e.preventDefault();

                        // Reset ngăn xếp về HomeScreen
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeTab' }],
                        });
                    },
                })} 
                />
            <Tab.Screen
                name="FavoriteTab"
                component={FavoriteStack}
            />
            <Tab.Screen
                name="GiftTab"
                component={GiftStack}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                listeners={() => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        // Điều hướng đến một màn hình khác (có thể là một màn hình trong ProfileStack)
                        navigation.navigate('Profile', {
                            screen: 'ProfileScreen', // Điều hướng đến ProfileScreen hoặc một màn hình khác
                        });
                    },
                })} />
        </Tab.Navigator>
    );
}
