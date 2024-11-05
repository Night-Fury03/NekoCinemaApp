import { View, Text, Image, TouchableWithoutFeedback, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import Carousel from "react-native-snap-carousel";
import { HeartIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "react-native";

var { width, height } = Dimensions.get('window')

export default function FavoriteMovieList({ data }) {
    const [liked, setLiked] = useState(true)
    let movieName = 'SuperBatNman & sipderAquarium: infinity war'
    let summary = 'Sao anh ta có thể viết được mấy lời nhẹ nhàng như vậy ta, thật tò mò là anh ta đã trải qua điều j để có mấy lời nhẹ nhàng như này'
    let time = '2hrs32min'
    let day = '24-11-2024'
    let type = 'Action • Adventure'

    return (
        <View className="mb-8 ">
            {/* movie row */}
            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'left', paddingBottom: 50 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <View className="mx-4 mt-4 rounded bg-customGray"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4, // Độ mờ
                                    elevation: 6,
                                }}
                                key={index}
                            >
                                <View className="flex-row items-center border-b border-gray-300">
                                    <Image
                                        source={require('../assets/img/blackClover.jpg')}
                                        style={{
                                            width: width * 0.24,
                                            height: height * 0.2
                                        }}
                                        className="rounded-tl"
                                    />
                                    <View className="flex-1 mx-4">
                                        <Text className="text-base font-bold">{movieName.length > 40 ? movieName.slice(0, 40) + '...' : movieName}</Text>
                                        <Text className="text-sm font-semibold text-neutral-400">{day}</Text>
                                        <Text className="text-xs font-light mt-3">{summary.length > 100 ? summary.slice(0, 100) + '...' : summary}</Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-between items-center px-2 py-4">
                                    <View>
                                        <Text className="font-semibold text-neutral-500">Time: {time}</Text>
                                        <Text className="font-semibold text-neutral-500">Type: {type}</Text>

                                    </View>
                                    <TouchableOpacity className="flex-row items-center"
                                        onPress={() => setLiked(!liked)}
                                    >
                                        <HeartIcon size={24} strokeWidth={1} color="#E3463F" />
                                        <Text className="ml-2 font-semibold text-neutral-500">Liked</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}