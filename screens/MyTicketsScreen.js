import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import Ticket from '../components/ticket';


export default function MyTicketsScreen() {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-customLinearGradient1">
            <View className="absolute z-10 my-8">
                <TouchableOpacity className="px-4 top-1" onPress={() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }], // reset homestack về homeScreen
                    });
                    navigation.navigate('HomeTab'); // điều hướng về homeTab
                }}>
                    <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                </TouchableOpacity>
            </View>
            <View className="w-full my-8 items-center justify-center">
                <Text className="text-white text-3xl">My Tickets</Text>
            </View>

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'left', paddingBottom: 50 }}
                scrollEventThrottle={16}
                className='flex-1'
            >
                {/* tickets */}
                <Ticket />
            </ScrollView>
        </View >
    )
}
