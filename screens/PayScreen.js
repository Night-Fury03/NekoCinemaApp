import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import Ticket from '../components/ticket';


export default function PayScreen() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Credit Card');

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

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
                <Ticket />

                {/* apply vouchers */}
                <View className="mt-6 w-full items-center">
                    <View className="w-10/12 flex flex-row justify-between items-center">
                        <Text className="text-white text-base font-semibold">Apply vouchers</Text>
                        <TouchableOpacity
                            className="p-3 items-center"
                            onPress={toggleModal}
                        >
                            <Text className="text-white">{`see all >>`}</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="w-10/12">
                        <View className="ml-2 mb-2 flex-row justify-between items-center">
                            <Text className="text-white">Decrease 15%</Text>
                            <Text className="text-white">-$2.5</Text>
                        </View>
                    </View>
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
                <View className="mt-6 w-full items-center">
                    <Text className="text-white text-lg font-bold mb-3 w-10/12">Payment method</Text>
                    <TouchableOpacity
                        onPress={() => handlePaymentMethodChange('Credit Card')}
                        className={`w-10/12 flex-row justify-between items-center rounded-lg py-3 px-5 border bg-transparent mb-3 ${selectedPaymentMethod === 'Credit Card' ? 'border-customYellow' : ' border-customGray'}`}
                    >
                        <Text className={`${selectedPaymentMethod === 'Credit Card' ? 'text-customYellow' : 'text-white'}`}>Credit Card</Text>
                        <View
                            className={`w-5 h-5 rounded-full border ${selectedPaymentMethod === 'Credit Card' ? 'bg-customYellow' : 'border-gray-400'}`}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePaymentMethodChange('Momo')}
                        className={`w-10/12 flex-row justify-between items-center rounded-lg py-3 px-5 border bg-transparent ${selectedPaymentMethod === 'Momo' ? 'border-customYellow' : ' border-customGray'}`}
                    >
                        <Text className={`${selectedPaymentMethod === 'Momo' ? 'text-customYellow' : 'text-white'}`}>Momo</Text>
                        <View
                            className={`w-5 h-5 rounded-full border ${selectedPaymentMethod === 'Momo' ? 'bg-customYellow' : 'border-gray-400'}`}
                        />
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
                    onPress={() => navigation.navigate("Complete")}
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
