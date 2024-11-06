import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from 'react-native-heroicons/outline';
import FavoriteMovieList from '../components/favoriteMovieList';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';



var { width, height } = Dimensions.get('window')
const TYPES = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime']


export default function FavoriteScreen() {
    const [favoriteMovies, setFavoriteMovies] = useState([1, 2, 3,4,5,6,7,8])
    const [filterType, setFilterType] = useState("All")
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const dropdownHeight = useSharedValue(0);

    useEffect(() => {
        // Khi isDropdownOpen thay đổi, animate height từ 0 -> 150 khi mở và ngược lại
        dropdownHeight.value = withTiming(isDropdownOpen ? height * 0.15 : 0, { duration: 200 });
    }, [isDropdownOpen]);

    const animatedDropMenu = useAnimatedStyle(() => ({
        height: dropdownHeight.value, 
    }));

    // const filteredProducts = favoriteMovies.filter((favoriteMovie) =>
    //     filterType === 'Tất cả' ? true : favoriteMovie.category === filterType
    // );

    const handleTypeSelect = (type) => {
        setFilterType(type);
        setDropdownOpen(false);
    };

    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <View className="flex-1 mt-8">
                <View className="flex-row justify-between w-full px-4">
                    <Text className="text-2xl text-neutral-300">My favorite</Text>
                    <Text className="text-base text-neutral-300">Count: {favoriteMovies.length}</Text>
                </View>

                <View className="flex-row w-full px-4 items-center py-4">
                    <Text className="text-xl text-neutral-500">Filter by: </Text>

                    {/* Filter */}
                    <View className=" ml-2">
                        {/* Dropdown */}
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setDropdownOpen(!isDropdownOpen)}
                        >
                            <Text className="text-base text-customYellow mr-2">{filterType}</Text>
                            {isDropdownOpen ?
                                <ChevronDownIcon size={22} strokeWidth={1} color="white" /> :
                                <ChevronRightIcon size={22} strokeWidth={1} color="white" />
                            }
                        </TouchableOpacity>

                        {/* Danh sách các tùy chọn trong dropdown */}

                        <Animated.View style={[animatedDropMenu, {
                            maxHeight: height * 0.15,
                            minWidth: width * 0.26,
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 4, // Độ mờ
                            elevation: 6,
                        }]}
                            className="absolute z-10 top-full bg-white px-1"
                        >
                            
                            <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'left' }}>
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
                            
                        </Animated.View>

                    </View>
                </View>

                <FavoriteMovieList data={favoriteMovies} />
            </View >
        </LinearGradient >
    );
}