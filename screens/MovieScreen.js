import React, { useEffect } from "react";
import Video from "react-native-video";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  HeartIcon,
  PlayCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { detailedMovieList } from "../api/getDetailsMovies";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [creditsMovie, setCreditsMovie] = useState({});
  const [like, setLike] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similar, setSimilar] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCreditsMovieList = async () => {
      const creditsMovieData = await detailedMovieList(JSON.stringify(item.id));
      console.log(creditsMovieData);
      setCreditsMovie(creditsMovieData["results"]);
    };

    fetchCreditsMovieList();
  }, []);

  return (
    <LinearGradient
      className="flex-1"
      colors={["#06141b", "#11212d"]}
      locations={[0.2, 1]}
    >
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* video thumbnail */}
          <View className="w-full mt-8">
            <ImageBackground
              source={require("../assets/img/blackClover.jpg")}
              style={{
                width: width,
                height: height * 0.3,
              }}
              className="relative justify-center items-center"
            >
              <TouchableOpacity
                className="absolute z-10 px-4 top-2 left-0"
                onPress={() => navigation.goBack()}
              >
                <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
              </TouchableOpacity>

              <TouchableOpacity>
                <PlayCircleIcon size={44} strokeWidth={1} color="#e9e9e9" />
              </TouchableOpacity>

              <Image
                className="absolute top-3/4 left-4 rounded-lg h-32 w-24"
                source={require("../assets/img/blackClover.jpg")}
              />
            </ImageBackground>
          </View>

          {/* Info movie */}
          <View>
            {/* MovieName & Time */}
            <View className="my-4 right-6">
              <Text className="text-right text-white font-semibold text-3xl">
                Black Clover
              </Text>
              <Text className="text-right text-white font-light text-md">
                JP • 2hrs32mins
              </Text>
            </View>

            {/* Type */}
            <View className="mt-4 mx-4">
              <Text className="text-customOrange font-semibold text-lg">
                Type
              </Text>
              <View className="px-2 pt-3">
                <Text className="text-white font-semibold">
                  Action - Family
                </Text>
              </View>
            </View>

            {/* Rating */}
            <View className="mt-4 mx-4">
              <Text className="text-customOrange font-semibold text-lg">
                Rate this Movie
              </Text>
              <View className="flex-row justify-between px-2 ">
                <View className="flex-row items-center">
                  <StarIcon size={20} strokeWidth={2} color="yellow" />
                  <Text className="text-white">7.1</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-white font-semibold mr-1">25.3k</Text>
                  <Text className="text-white font-light mr-1">votes</Text>
                  <TouchableOpacity
                    className="p-3"
                    onPress={() => setLike(!like)}
                  >
                    {!like ? (
                      <HeartIcon size={24} strokeWidth={2} color="#E3463F" />
                    ) : (
                      <HeartIconSolid
                        size={24}
                        strokeWidth={2}
                        color="#E3463F"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Summary */}
            <View className="mx-4">
              <Text className="text-customOrange font-semibold text-lg">
                Summary
              </Text>
              <View className="px-2 pt-3">
                <Text className="text-white font-semibold">
                  Arthur Curry, the human-born heir to the underwater kingdom of
                  Atlantis, goes on a quest to prevent a war between the worlds
                  of ocean and land. Arthur Curry has always been different. His
                  mother was an honorable Queen of Atlantean descent, while his
                  father, a simple human lighthouse keeper.
                </Text>
              </View>
            </View>

            {/* Cast */}
            <View className="mt-4 ">
              <Text className="text-customOrange font-semibold text-lg mx-4">
                Cast
              </Text>
              <Cast navigation={navigation} cast={cast} />
            </View>

            {/* Similar movies */}
            <View className="mt-4">
              <MovieList
                title="Similar movies"
                hideSeeAll={true}
                data={similar}
              />
            </View>
          </View>
        </ScrollView>
      )}

      {loading ? null : (
        <View className="absolute w-full bottom-4">
          <TouchableOpacity className="bg-customRed py-1.5 mx-6 rounded-xl items-center"
            onPress={() => navigation.navigate('Booking')}
          >
            <Text className="text-white text-base">Booking Ticket</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}
