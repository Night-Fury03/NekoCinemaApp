import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const ios = Platform.OS == 'ios'

export default function BookingScreen() {
    const navigation = useNavigation();
    const movieName = "Black Clover"
    const [day] = useState([1, 2, 3])

    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <View className="absolute z-10 my-8">
                <TouchableOpacity className="px-4 top-1" onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                </TouchableOpacity>
            </View>
            <View className="w-full my-8 items-center justify-center">
                <Text className="text-white text-3xl">{movieName}</Text>
            </View>
            <View className="w-full flex-row">
                <View className="px-3 h-14 bg-customGray rounded-r-2xl justify-center">
                    <Text className="text-lg">JUL</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {day.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="bg-white space-y-1 w-6 rounded-2xl justify-center items-center"
                            >

                                <Text className="">
                                    {item.length > 14
                                        ? item.slice(0, 14) + "..."
                                        : item}
                                </Text>

                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </LinearGradient>
    )
}