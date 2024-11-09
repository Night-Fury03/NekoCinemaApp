import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import GiftStack from './GiftStack';
import ProfileStack from './ProfileStack';
import { HeartIcon, HomeIcon, GiftIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


const Tab = createBottomTabNavigator();

function TabBarIcon({ isFocused, IconComponent }) {
    // Giá trị sharedValue để lưu trữ trạng thái phóng to
    const scale = useSharedValue(1);

    // Cập nhật giá trị sharedValue khi `focused` thay đổi
    useFocusEffect(
        React.useCallback(() => {
            scale.value = withTiming(isFocused ? 1.2 : 1, { duration: 200 });
        }, [isFocused])
    );


    // Tạo animated style để áp dụng hiệu ứng phóng to
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <IconComponent size={isFocused ? 36 : 28} color={isFocused ? '#F5C51C' : '#9e9e9e'} />
        </Animated.View>
    );
}


export default function TabNavigator() {
    const navigation = useNavigation();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                if (route.name === 'HomeTab') {
                    return <TabBarIcon isFocused={focused} IconComponent={HomeIcon} />;
                } else if (route.name === 'FavoriteTab') {
                    return <TabBarIcon isFocused={focused} IconComponent={HeartIcon} />;
                } else if (route.name === 'GiftTab') {
                    return <TabBarIcon isFocused={focused} IconComponent={GiftIcon} />;
                } else if (route.name === 'ProfileTab') {
                    return <TabBarIcon isFocused={focused} IconComponent={UserIcon} />;
                }
            },
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#11212d',
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
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        // Ngăn chặn hành vi điều hướng mặc định
                        e.preventDefault();

                        // Reset ngăn xếp về HomeScreen
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'FavoriteTab' }],
                        });
                    },
                })}
            />
            <Tab.Screen
                name="GiftTab"
                component={GiftStack}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        // Ngăn chặn hành vi điều hướng mặc định
                        e.preventDefault();

                        // Reset ngăn xếp về HomeScreen
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'GiftTab' }],
                        });
                    },
                })}
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
                })}
            />
        </Tab.Navigator>
    );
}
