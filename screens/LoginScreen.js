import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { XMarkIcon } from 'react-native-heroicons/outline';


var { width, height } = Dimensions.get('window')


export default function LoginScreen() {
    const [isLogin, setIsLogin] = useState(true)
    const [inputAcountValue, setInputAccountValue] = useState('');
    const [inputPassValue, setInputPassValue] = useState('');

    return (
        <LinearGradient className="flex-1 flex-col justify-center items-center" colors={['#1d1d1d', '#1C2743']} locations={[0.2, 1]}>
            <View className="mb-16">
                <Image source={require('../assets/img/LogoApp.png')}
                    className="scale-150"
                />
            </View>
            <View className="mb-4 ml-16 w-full">
                <Text className="text-white text-4xl">{isLogin ? 'SIGN IN' : 'SIGN UP'}</Text>
            </View>

            <View className="w-full">
                <View className="mx-8 mb-4 flex-row items-center justify-between border border-neutral-500 rounded">
                    <TextInput
                        placeholder='Email or Phone number'
                        value={inputAcountValue}
                        placeholderTextColor={'gray'}
                        className="flex-1 py-2 px-4 text-white text-base font-semibold tracking-wider"
                        onChangeText={(text) => setInputAccountValue(text)}
                    />
                    {
                        inputAcountValue.length > 0 && (
                            <TouchableOpacity className="px-2" onPress={() => setInputAccountValue('')}>
                                <XMarkIcon size={24} strokeWidth={1} color="white" />
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View className="mx-8 mb-4 flex-row items-center justify-between border border-neutral-500 rounded">
                    <TextInput
                        placeholder='Password'
                        value={inputPassValue}
                        placeholderTextColor={'gray'}
                        className="flex-1 py-2 px-4 text-white text-base font-semibold tracking-wider"
                        onChangeText={(text) => setInputPassValue(text)}
                    />
                    {
                        inputPassValue.length > 0 && (
                            <TouchableOpacity className="px-2" onPress={() => setInputPassValue('')}>
                                <XMarkIcon size={24} strokeWidth={1} color="white" />
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View className="mx-8 mb-4">
                    <TouchableOpacity className="bg-customRed items-center rounded">
                        <Text className="text-white  text-base py-2">{isLogin ? 'SIGN IN' : 'SIGN UP'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Or */}
            <View className="w-full px-16 my-4 flex-row items-center justify-between">
                <View style={{ width: width * 0.3 }} className="border border-gray-700"></View>
                <Text className="text-neutral-500">or</Text>
                <View style={{ width: width * 0.3 }} className="border border-gray-700"></View>
            </View>

            <View className="w-full">
                <TouchableOpacity className="mx-8 my-4 items-center border border-neutral-500 rounded"
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text className="text-neutral-400  text-base py-2">{isLogin ? 'SIGN UP' : 'SIGN IN'}</Text>
                </TouchableOpacity>
            </View>

            {/* Google or Facebook */}
            <View className="w-full px-16 my-4 flex-row items-center justify-between">
                <TouchableOpacity className="mx-8 my-4 items-center border border-neutral-500 rounded"
                    onPress={() => setIsLogin(!isLogin)}
                >
                    
                    <Text className="text-neutral-400  text-base py-2">Google</Text>
                </TouchableOpacity> 
                <TouchableOpacity className="mx-8 my-4 items-center border border-neutral-500 rounded"
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text className="text-neutral-400  text-base py-2">Facebook</Text>
                </TouchableOpacity>
            </View>


        </LinearGradient>
    );
}