import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { ArrowLeftEndOnRectangleIcon, ArrowLeftIcon, Cog6ToothIcon, HeartIcon, QuestionMarkCircleIcon, TicketIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const ios = Platform.OS == 'ios'


export default function PersonScreen() {
    const navigation = useNavigation();
    let userName = 'Trinh Kien Tuong'
    const translateY = useSharedValue(-50); 
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.5)

    useEffect(() => {
        translateY.value = withTiming(0, { duration: 500 });
        opacity.value = withTiming(1, { duration: 800 });
        scale.value = withTiming(1, { duration: 500 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const animatedOpacity = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));
    
    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <View className="w-full mt-8">
                <View className="flex-row items-center">
                    <TouchableOpacity className="px-4" onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                    </TouchableOpacity>
                    <Text className="text-lg text-neutral-300">Profile</Text>
                </View>

                <Animated.View style={animatedStyle} className="bg-customGrayDark h-28 mx-6 rounded-xl justify-center items-center mt-12">
                    {/* avatar */}
                    <View  className="absolute bottom-20 rounded-full overflow-hidden h-16 w-16"
                        style={{
                            // íos
                            shadowColor: 'gray',
                            shadowOpacity: 1,
                            shadowRadius: 10,
                            shadowOffset: { width: 0, height: 5 },
                            // android
                            elevation: 20,
                        }}
                    >
                        <Image
                            source={require('../assets/img/blackClover.jpg')}
                            className="h-full w-full"
                        />
                    </View>

                    <Text className="text-lg">
                        {userName}
                    </Text>
                </Animated.View>

                <Animated.View style={animatedOpacity} className="rounded-xl border border-neutral-400 py-6 px-4 mx-6 mt-8">
                    <TouchableOpacity className="py-4 flex-row items-center">
                        <HeartIcon size={30} strokeWidth={1} color="white" />
                        <Text className="text-neutral-300 text-lg ml-2">Favorite Movies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-4 flex-row items-center">
                        <TicketIcon size={30} strokeWidth={1} color="white" />
                        <Text className="text-neutral-300 text-lg ml-2">My Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-4 flex-row items-center">
                        <Cog6ToothIcon size={30} strokeWidth={1} color="white" />
                        <Text className="text-neutral-300 text-lg ml-2">Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-4 flex-row items-center">
                        <QuestionMarkCircleIcon size={30} strokeWidth={1} color="white" />
                        <Text className="text-neutral-300 text-lg ml-2">Help and Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-4 flex-row items-center">
                        <ArrowLeftEndOnRectangleIcon size={30} strokeWidth={1} color="white" />
                        <Text className="text-neutral-300 text-lg ml-2">Log out</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </LinearGradient>
    )
}