import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from 'react-native-heroicons/outline';
import FavoriteMovieList from '../components/favoriteMovieList';



var { width, height } = Dimensions.get('window')
const TYPES = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime']


export default function FavoriteScreen() {
    const [favoriteMovies, setFavoriteMovies] = useState([1, 2, 3])
    const [filterType, setFilterType] = useState("All")
    const [isDropdownOpen, setDropdownOpen] = useState(false);


    const filteredProducts = favoriteMovies.filter((favoriteMovie) =>
        filterType === 'Tất cả' ? true : favoriteMovie.category === filterType
    );

    const handleTypeSelect = (type) => {
        setFilterType(type);
        setDropdownOpen(false); // Đóng dropdown sau khi chọn
    };

    return (
        <LinearGradient className="flex-1" colors={['#1d1d1d', '#1C2743']} locations={[0.2, 1]}>
            <View className="flex-1 mt-8">
                <View className="flex-row justify-between w-full px-4">
                    <Text className="text-2xl text-neutral-300">My favorite</Text>
                    <Text className="text-base text-neutral-300">Count: {favoriteMovies.length}</Text>
                </View>

                <View className="flex-row w-full px-4 items-center">
                    <Text className="text-xl text-neutral-500">Filter by: </Text>

                    {/* Filter */}
                    <View className=" ml-2">
                        {/* Dropdown */}
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setDropdownOpen(!isDropdownOpen)}
                        >
                            <Text className="text-base text-customOrange mr-2">{filterType}</Text>
                            {isDropdownOpen ?
                                <ChevronDownIcon size={22} strokeWidth={1} color="white" /> :
                                <ChevronRightIcon size={22} strokeWidth={1} color="white" />
                            }
                        </TouchableOpacity>

                        {/* Danh sách các tùy chọn trong dropdown */}
                        {isDropdownOpen && (
                            <ScrollView
                                className="absolute z-10 top-full bg-white px-1"
                                style={{
                                    maxHeight: height * 0.15, 
                                    minWidth: width * 0.24,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 2, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4, // Độ mờ
                                    elevation: 6,
                                }}
                                contentContainerStyle={{ justifyContent: 'center', alignItems: 'left' }}
                            >
                                {TYPES.map((type) => (
                                    type === filterType ? null :
                                        <TouchableOpacity
                                            key={type}
                                            className="py-0.5"
                                            onPress={() => handleTypeSelect(type)}
                                        >
                                            <Text className="text-base">{type}</Text>
                                        </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                </View>

                <FavoriteMovieList data={favoriteMovies}/>
            </View >
        </LinearGradient >
    );
}