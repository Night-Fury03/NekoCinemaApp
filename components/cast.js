import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function Cast({ cast, navigation }) {
    let personName = 'Dwayne Johnson'
    let characterName = 'The Rock'
    return (
        <View className="flex-row pt-3">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="items-center mr-4"
                                onPress={() => navigation.navigate("Person", person)}
                            >
                                <View className="overflow-hiden rounded-full h-20 w-20 items-center border border-neutral-500">
                                    <Image
                                        className="rounded-full h-20 w-20"
                                        source={require('../assets/img/ava1.png')}
                                    />
                                </View>
                                <Text className="text-white text-xs mt-1">
                                    {
                                        characterName.length > 10 ? characterName.slice(0, 10) + "..." : characterName
                                    }
                                </Text>
                                <Text className="text-neutral-400 text-xs mt-1">
                                    {
                                        personName.length > 10 ? personName.slice(0, 10) + "..." : personName
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}