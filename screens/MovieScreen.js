import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Button,
  Modal
} from "react-native";
import {
  ArrowLeftIcon,
  HeartIcon,
  PlayCircleIcon,
} from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { HeartIcon as HeartIconSolid } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { detailedMovieList } from "../api/getDetailsMovies";
import { imgBaseUrl } from "../constants";
import { castMovieList } from "../api/getCastMovie";
import { similarMovieList } from "../api/getSimilarMovie";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [detailsMovie, setDetailsMovie] = useState({});
  const [like, setLike] = useState(false);
  const [cast, setCast] = useState({});
  const [similarMovie, setSimilarMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetailsMovieList = async () => {
      const detailsMovieData = await detailedMovieList(JSON.stringify(item.id));
      setDetailsMovie(detailsMovieData);
    };
    const fetchCreditsMovieList = async () => {
      const creditsMovieData = await castMovieList(JSON.stringify(item.id));
      setCast(creditsMovieData);
    };
    const fetchSimilarMovieList = async () => {
      const similarMovie = await similarMovieList(JSON.stringify(item.id));
      setSimilarMovie(similarMovie["results"]);
    };

    fetchSimilarMovieList();
    fetchDetailsMovieList();
    fetchCreditsMovieList();
  }, []);

  return (
    <View className="flex-1 bg-customLinearGradient1">
      {loading ? (
        <Loading />
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {/* video thumbnail */}
          <View className="w-full">
            <ImageBackground
              source={{ uri: `${imgBaseUrl}${item.backdrop_path}` }}
              style={{
                width: width,
                height: height * 0.3,
              }}
              className="relative justify-center items-center"
            >
              <TouchableOpacity
                className="absolute z-10 px-4 top-10 left-0"
                onPress={() => navigation.goBack()}
              >
                <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
              </TouchableOpacity>

              <TouchableOpacity>
                <PlayCircleIcon size={44} strokeWidth={1} color="#e9e9e9" />
              </TouchableOpacity>

              <Image
                className="absolute top-3/4 left-4 rounded-lg h-32 w-24"
                source={{ uri: `${imgBaseUrl}${item.backdrop_path}` }}
              />
            </ImageBackground>
          </View>

          {/* Info movie */}
          <View>
            {/* MovieName & Time */}
            <View className="my-4 right-6">
              <Text className="text-right text-white font-semibold text-3xl">
                {detailsMovie.original_title}
              </Text>
              <Text className="text-right text-white font-light text-md">
                {detailsMovie.origin_country} • {detailsMovie.runtime}mins
              </Text>
            </View>
            {/* Type */}

            <View className="mt-4 mx-4">
              <Text className="text-customOrange font-semibold text-lg">
                Type
              </Text>
              <View
                className="text-white font-semibold"
                style={{ flexDirection: "row" }}
              >
                {detailsMovie.genres && detailsMovie.genres.length > 0
                  ? detailsMovie.genres.map((genre) => (
                    <Text
                      key={genre.id}
                      className="text-right text-white font-light text-md"
                    >
                      {genre.name}
                    </Text>
                  ))
                  : null}
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
                  <Text className="text-white">
                    {detailsMovie.vote_average}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-white font-semibold mr-1">
                    {detailsMovie.vote_count}
                  </Text>
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
                  {detailsMovie.overview}
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
                data={similarMovie}
              />
            </View>
          </View>
        </ScrollView>
      )}


      <View className="absolute w-full bottom-4">
        <TouchableOpacity className="bg-customPink py-1.5 mx-6 rounded-xl items-center"
          onPress={() => navigation.navigate('Booking')}
        >
          <Text className="text-white text-base">Booking Ticket</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
