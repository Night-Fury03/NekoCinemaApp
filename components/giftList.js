import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { HeartIcon } from "react-native-heroicons/solid";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, interpolate } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';


var { width, height } = Dimensions.get('window')

export default function GiftList({ data }) {
    const animatedValues = data.map(() => useSharedValue(-width));

    const IMAGE_HEIGHT = height * 0.2;
    const IMAGE_WIDTH = width * 0.24;

    let giftName = 'Sale 15%'
    let condition = 'Sao anh ta có thể viết được mấy lời nhẹ nhàng như vậy ta, thật tò mò là anh ta đã trải qua điều j để có mấy lời nhẹ nhàng như này'
    let time = '2hrs32min'

    useFocusEffect(
        React.useCallback(() => {
            // Khi màn hình được focus, đặt lại vị trí bắt đầu của các item
            animatedValues.forEach((animatedValue, index) => {
                animatedValue.value = withTiming(0, {
                    duration: 400 + index * 150,
                });
            });
        }, [animatedValues])
    );

    return (
        <ScrollView
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ justifyContent: 'center', alignItems: 'left', paddingBottom: 50 }}
        >
            {
                data.map((item, index) => {
                    const animatedStyle = useAnimatedStyle(() => {
                        return {
                            transform: [{ translateX: animatedValues[index].value }],
                            opacity: interpolate(
                                animatedValues[index].value,
                                [-width, 0],
                                [0, 1]
                            ),
                        };
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[
                                animatedStyle,
                                {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 6,
                                }
                            ]}
                            className="relative rounded bg-customGray mb-8 mx-4"
                        >
                            <View className="flex-row items-center border-b border-gray-300">
                                <Image
                                    source={require('../assets/img/ava1.png')}
                                    style={{
                                        width: IMAGE_WIDTH,
                                        height: IMAGE_HEIGHT
                                    }}
                                    className="rounded-tl"
                                />
                                <View className="flex-1 mx-4">
                                    <Text className="text-3xl font-bold">{giftName}</Text>
                                    <Text className="text-xs font-light mt-3">{condition.length > 100 ? condition.slice(0, 100) + '...' : condition}</Text>
                                </View>
                            </View>
                            <View className="flex-row justify-between items-center px-2 py-4">
                                <View style={{width: IMAGE_WIDTH,}}>
                                    <Text className="font-semibold text-neutral-500">EXP: {time}</Text>
                                </View>
                                <TouchableOpacity className="items-center bg-customRed p-3 rounded"

                                >
                                    <Text className="font-semibold text-white">Collection</Text>
                                </TouchableOpacity>
                            </View>

                            <View className='absolute z-10 h-2 w-full bg-customOrange'
                                style={{
                                    top: IMAGE_HEIGHT
                                }}
                            ></View>
                            <View className='absolute z-10 w-2 h-full bg-customOrange'
                                style={{
                                    left: IMAGE_WIDTH
                                }}
                            ></View>

                            <View className="absolute flex-row justify-center items-center z-10"
                                style={{
                                    top: IMAGE_HEIGHT - 18,
                                    left: IMAGE_WIDTH - 13,
                                }}
                            >
                                <View className="relative border-y-4 border-l-4 rounded-xl w-5 h-5 border-customOrange"
                                    style={{
                                        marginRight: -6
                                    }}
                                >
                                    <View className="w-1 h-7 bg-customOrange rotate-45"
                                        style={{
                                            top: "100%",
                                            right: 0,
                                        }}
                                    ></View>
                                </View>
                                <View className="relative border-y-4 border-r-4 rounded-xl w-5 h-5 border-customOrange"
                                    
                                >
                                    <View className="w-1 h-7 bg-customOrange"
                                        style={{
                                            top: "100%",
                                            left: 12,
                                            transform: [{ rotate: '-45deg' }]
                                        }}
                                    ></View>
                                </View>
                            </View>

                        </Animated.View>
                    )
                })
            }
        </ScrollView>

    )
}