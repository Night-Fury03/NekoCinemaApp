import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { ArrowLeftEndOnRectangleIcon, ArrowLeftIcon, Cog6ToothIcon, HeartIcon, QuestionMarkCircleIcon, TicketIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movieList'
import Loading from '../components/loading';

const ios = Platform.OS == 'ios'

export default function PersonScreen() {
    const navigation = useNavigation();
    let userName = 'Trinh Kien Tuong'
    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <View className="w-full mt-8">
                <View className="flex-row items-center">
                    <TouchableOpacity className="px-4" onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                    </TouchableOpacity>
                    <Text className="text-lg text-neutral-300">Profile</Text>
                </View>

                <View className="bg-customGrayDark h-28 mx-6 rounded-xl justify-center items-center mt-12">
                    {/* avatar */}
                    <View className="absolute bottom-20 rounded-full overflow-hidden h-16 w-16"
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
                </View>

                <View className="rounded-xl border border-neutral-400 py-6 px-4 mx-6 mt-8">
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
                </View>
            </View>
        </LinearGradient>
    )
}