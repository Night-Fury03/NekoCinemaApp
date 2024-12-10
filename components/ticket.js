import React from 'react'
import { Image, Text, View } from 'react-native'
import { imgBaseUrl } from '../constants'

export default function Ticket({ movie, detailsMovie, day, time, chairs }) {
    return (
        <View className="bg-customGray rounded-lg shadow-md mx-4 overflow-hidden">
            {/* Nội dung Ticket */}
            <View className="p-4">
                {/* Header */}
                <View className=" relative flex-row border-b border-dashed border-customGrayDark pb-4">
                    <View className="flex-1 mr-4">
                        <Text className="text-lg font-bold">
                            {detailsMovie.original_title.length > 14
                                ? detailsMovie.original_title.slice(0, 14) + "..."
                                : detailsMovie.original_title}
                        </Text>
                        <View className="flex-row space-x-2 mt-2">
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">{detailsMovie.origin_country}</Text>
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">Tamil</Text>
                            <Text className="text-xs bg-gray-200 px-2 py-1 rounded-full">2D</Text>
                        </View>
                        <Text className="text-gray-500 text-xs mt-2">
                            {detailsMovie.overview.length > 50
                                ? detailsMovie.overview.slice(0, 50) + "..."
                                : detailsMovie.overview}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: `${imgBaseUrl}${movie.backdrop_path}` }}
                        className="w-16 h-16 rounded-lg"
                    />

                    <View className="absolute top-[100%] left-[-40px] w-10 h-10 bg-customLinearGradient1 rounded-full" />
                    <View className="absolute top-[100%] right-[-40px] w-10 h-10 bg-customLinearGradient1 rounded-full" />
                </View>

                {/* Footer */}
                <View className="flex-row justify-between items-center pt-4">
                    <View>
                        <Text className="text-sm font-bold">{day.thu}, {day.day} Dec, {time}</Text>
                        <View className="flex-row flex-wrap">
                            {chairs.map((chair, index) => {
                                let showDot = index + 1 != chairs.length
                                return (<Text key={index} className="text-xs text-gray-500 mt-1">{chair}{showDot ? "  -  " : null}</Text>)
                            })}
                        </View>
                    </View>
                    <View className="bg-gray-100 px-4 py-2 rounded-lg items-center">
                        <Text className="text-lg font-bold">{chairs.length}</Text>
                        <Text className="text-xs text-gray-500">Tickets</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
