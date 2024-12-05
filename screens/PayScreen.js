import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";


export default function PayScreen() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSave = () => {
        setModalVisible(false);
    };

    return (
        <View className="flex-1 bg-customLinearGradient1">
            <View className="absolute z-10 my-8">
                <TouchableOpacity className="px-4 top-1" onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                </TouchableOpacity>
            </View>
            <View className="w-full my-8 items-center justify-center">
                <Text className="text-white text-3xl">Pay</Text>
            </View>

            <ScrollView
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'left', paddingBottom: 50 }}
                scrollEventThrottle={16}
                className='flex-1'
            >
                {/* tickets */}
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

                {/* apply vouchers */}
                <View className="mt-6 w-full items-center bg-customGray">
                    <TouchableOpacity
                        className="rounded-full p-3 items-center bg-gray-100 border border-customPink text-customPink"
                        onPress={toggleModal}
                    >
                        <Text className="text-customPink">Apply vouchers</Text>
                    </TouchableOpacity>
                </View>

                {/* detail ticket */}
                <View className="mt-6 items-center">
                    <View className="w-10/12 mt-4">
                        <Text className="text-white text-lg font-bold mb-1">Selected Seats</Text>
                        <View className="w-full flex-row justify-between">
                            <View className="w-8/12 ml-2 flex-row flex-wrap">

                                <Text className="text-white mr-2">A2 A3</Text>

                            </View>
                            <Text className="text-white text-right flex-1">$2.5</Text>
                        </View>
                    </View>

                    <View className="w-10/12 mt-4">
                        <Text className="text-white text-lg font-bold mb-1">Foods & Drinks</Text>
                        <View className="ml-2 mb-2 flex-row justify-between items-center">
                            <Text className="text-white">Popcorn x2</Text>
                            <Text className="text-white">$2.5</Text>
                        </View>
                    </View>
                </View>

                {/* type payment */}
                <View className="mt-6 w-full items-center bg-customGray">
                    <TouchableOpacity
                        className="rounded-full p-3 items-center bg-gray-100 border border-customPink text-customPink"
                    >
                        <Text className="text-customPink">hinh thuc thanh toan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View className="w-full py-2 items-center border-t border-neutral-400">
                <View className="w-10/12 mb-4 flex-row justify-between items-center text-white text-xl font-bold">
                    <Text className="text-white text-xl font-bold">Total :</Text>
                    <Text className="text-white text-xl font-bold">$10</Text>
                </View>

                <TouchableOpacity
                    className="w-10/12 rounded-lg mx-4 p-3 items-center bg-customPink"
                >
                    <Text className="text-white font-bold">Pay</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for selecting voucher */}
            <Modal
                visible={isModalVisible}
                animationType='fade'
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View className="w-10/12 p-5 bg-white rounded-lg items-center">
                        <Text className="mb-5 text-lg font-bold" >Choose your items</Text>

                        {/* Save Button */}
                        <TouchableOpacity className="w-6/12 mt-5 py-2  rounded-lg bg-customOrange items-center" onPress={handleSave}>
                            <Text className="text-white text-base">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    )
}
