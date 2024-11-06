import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movieList'
import Loading from '../components/loading';

const ios = Platform.OS == 'ios'

export default function PersonScreen() {
    const navigation = useNavigation();
    const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5])
    const [loading, setLoading] = useState(false)

    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            {
                loading ? <Loading /> : (
                    <ScrollView >
                        <View className="w-full mt-8">
                            <TouchableOpacity className="px-4 top-2 left-0" onPress={() => navigation.goBack()}>
                                <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                            </TouchableOpacity>

                            <View className="items-center mt-6">
                                {/* avatar */}
                                <View className="rounded-full overflow-hidden h-64 w-64"
                                    style={{
                                        // íos
                                        shadowColor: 'gray',
                                        shadowOpacity: 1,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 5 },
                                        // android
                                        elevation: 20,
                                    }}
                                >
                                    <Image
                                        source={require('../assets/img/blackClover.jpg')}
                                        className="h-full w-full"
                                    />
                                </View>

                                {/* Name */}
                                <View className="mt-6">
                                    <Text className="text-3xl text-white font-bold text-center">
                                        Astra
                                    </Text>
                                    <Text className="text-base text-neutral-500 text-center">
                                        Japan, Tokyo
                                    </Text>
                                </View>

                                <View className="p-4 mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                        <Text className="text-white font-semibold">Gender</Text>
                                        <Text className="text-neutral-300 font-sm">Male</Text>
                                    </View>

                                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                        <Text className="text-white font-semibold">Birthday</Text>
                                        <Text className="text-neutral-300 font-sm">12-12-1990</Text>
                                    </View>

                                    <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                        <Text className="text-white font-semibold">Known for</Text>
                                        <Text className="text-neutral-300 font-sm">Acting</Text>
                                    </View>

                                    <View className="px-2 items-center">
                                        <Text className="text-white font-semibold">Popularity</Text>
                                        <Text className="text-neutral-300 font-sm">78.24</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Biography */}
                            <View className="my-6 mx-4">
                                <Text className="text-customOrange font-semibold text-lg my-2">Biography</Text>
                                <Text className="text-neutral-400">Asta (Japanese: アスタ, Hepburn: Asuta) is a fictional character and the main protagonist of the manga series Black Clover created by Yūki Tabata. A peasant orphan who was left at a church, he aspires to become the next Wizard King. He has no magical power, but overcame this through intense physical training which allow him to wield anti-magic swords from a five-leaf clover grimoire in which a devil resides. He then becomes a Magic Knight, joining the Black Bulls squad in hopes of achieving his dream.

                                    In the Black Clover anime adaptation, he is voiced by Gakuto Kajiwara in Japanese and Dallas Reid in English. Asta was originally the subject of mixed responses due to his characterization coming across as archetype and the tone used by Kajiwara. However, he was still received positively by critics for his determination and relationships with other characters in the series.</Text>
                            </View>

                            {/* Movie */}
                            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
                        </View>
                    </ScrollView>
                )
            }
        </LinearGradient>
    )
}