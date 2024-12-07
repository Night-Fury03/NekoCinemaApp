import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function CompleteScreen() {
    const navigation = useNavigation();

    return (
        <View className="relative flex-1 flex flex-col bg-customLinearGradient1 items-center justify-center gap-y-8">
            <Image source={require("../assets/img/Logo.png")}></Image>

            <View className='mb-32'>
                <Text className="text-white text-3xl font-bold text-center">Booking</Text>
                <Text className="text-white text-3xl font-bold text-center">Successfully</Text>
            </View>

            <View className="absolute w-10/12 bottom-10 flex flex-col gap-y-8">
                <TouchableOpacity className="items-center bg-customGray w-full p-3 rounded-lg"
                    onPress={() => navigation.navigate("MyTickets")}>
                    <Text className="text-lg">My tickets</Text>
                </TouchableOpacity>

                <TouchableOpacity className="items-center bg-customPink w-full p-3 rounded-lg"
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }], // reset homestack về homeScreen
                        });
                        navigation.navigate('HomeTab'); // điều hướng về homeTab
                    }}
                >
                    <Text className="text-lg text-white">Back to home</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
