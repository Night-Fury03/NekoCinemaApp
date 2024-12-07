import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Ticket({ data }) {
    return (
        <View className="bg-customGray rounded-lg shadow-md mx-4 overflow-hidden">
            {/* Nội dung Ticket */}
            <View className="p-4">
                {/* Header */}
                <View className=" relative flex-row border-b border-dashed border-customGrayDark pb-4">
                    <View className="flex-1 mr-4">
                        <Text className="text-lg font-bold">Maaveeran</Text>
                        <View className="flex-row space-x-2 mt-2">
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">U/A</Text>
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">Tamil</Text>
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">2D</Text>
                        </View>
                        <Text className="text-gray-500 text-xs mt-2">
                            Ram Muthuram Cinemas 4K SKS Dolby Atmos
                        </Text>
                    </View>
                    <Image
                        source={require('../assets/img/ava1.png')}
                        className="w-16 h-16 rounded-lg"
                    />

                    <View className="absolute top-[100%] left-[-40px] w-10 h-10 bg-customLinearGradient1 rounded-full" />
                    <View className="absolute top-[100%] right-[-40px] w-10 h-10 bg-customLinearGradient1 rounded-full" />
                </View>

                {/* Footer */}
                <View className="flex-row justify-between items-center pt-4">
                    <View>
                        <Text className="text-sm font-bold">Mon, 01 Jul, 11:30 AM</Text>
                        <Text className="text-xs text-gray-500 mt-1">
                            A-01 - 02
                        </Text>
                    </View>
                    <View className="bg-gray-100 px-4 py-2 rounded-lg items-center">
                        <Text className="text-lg font-bold">2</Text>
                        <Text className="text-xs text-gray-500">Tickets</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
