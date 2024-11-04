import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { XMarkIcon } from 'react-native-heroicons/outline';


var { width, height } = Dimensions.get('window')


export default function GiftScreen() {
    return (
        <LinearGradient className="flex-1" colors={['#1d1d1d', '#1C2743']} locations={[0.2, 1]}>
            <ScrollView className="flex-1" contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
                
            </ScrollView >
        </LinearGradient >
    );
}