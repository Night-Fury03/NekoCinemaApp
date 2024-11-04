import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React from 'react'
import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon } from "react-native-heroicons/outline";

var { width, height } = Dimensions.get('window')


export default function Comment({ data }) {
    let userName = "Trinh Kien Tuong"
    let time = "24/11/2023"
    let comment = "Đối với một người am hiểu như anh đây, thì anh thấy Hình ảnh, màu phim, cảnh phim rất đẹp và đầu tư. Sau khi xem xong k đọng lại một thông điệp gì ý nghĩa, đang xem tự nhiên hết phim, hụt hẫng. K có cảnh cao trào"
    return (
        <View className="mb-8 space-y-4">
            {
                data.map((item, index) => {
                    return (
                        <View key={index} className="bg-customBlueDark mx-4 p-4">
                            <View className="flex-row items-center">
                                <Image
                                    source={require('../assets/img/ava1.png')}
                                    className="rounded-full w-7 h-7"
                                />
                                <View className="ml-2">
                                    <Text className="text-neutral-300">{userName}</Text>
                                    <Text className="text-neutral-300">{time}</Text>
                                </View>
                            </View>

                            <View className="my-2">
                                <Text className="text-neutral-300">{comment}</Text>
                            </View>

                            <View className="flex-row space-x-2">
                                <TouchableOpacity>
                                    <HeartIcon size={22} strokeWidth={1} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <ChatBubbleOvalLeftEllipsisIcon size={22} strokeWidth={1} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <ShareIcon size={22} strokeWidth={1} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}