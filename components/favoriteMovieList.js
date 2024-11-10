import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { HeartIcon } from "react-native-heroicons/solid";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import { detailedMovieList } from "../api/getDetailsMovies";
import { imgBaseUrl } from "../constants";

var { width, height } = Dimensions.get("window");

export default function FavoriteMovieList({ data }) {
  const [liked, setLiked] = useState(true);
  const [detailedMovies, setDetailsMovies] = useState([]);
  const [movieID, setMovieID] = useState("");
  const animatedValues = data.map(() => useSharedValue(-width));

  const ITEM_HEIGHT = height * 0.2;

  useFocusEffect(
    React.useCallback(() => {
      // Khi màn hình được focus, đặt lại vị trí bắt đầu của các item
      animatedValues.forEach((animatedValue, index) => {
        animatedValue.value = withTiming(0, {
          duration: 400 + index * 150,
        });
      });
    }, [animatedValues])
  );

  useEffect(() => {
    const fetchDetailedMovieList = async (movieID) => {
      const detailedMoviesData = detailedMovieList(JSON.stringify(movieID));
      console.log(detailedMoviesData);
      setDetailsMovies(detailedMoviesData);
    };
    fetchDetailedMovieList();
  }, [movieID]);

  return (
    <ScrollView
      vertical
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "left",
        paddingBottom: 50,
      }}
    >
      {data.map((item, index) => {
        setMovieID(JSON.stringify(item.id));
        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateX: animatedValues[index].value }],
            opacity: interpolate(
              animatedValues[index].value,
              [-width, 0],
              [0, 1]
            ),
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              animatedStyle,
              {
                shadowColor: "#000",
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 6,
              },
            ]}
            className="rounded bg-customGray mb-8 mx-4"
          >
            <View className="flex-row items-center border-b border-gray-500">
              <Image
                source={{ uri: `${imgBaseUrl}${detailedMovies.poster_path}` }}
                style={{
                  width: width * 0.24,
                  height: ITEM_HEIGHT,
                }}
                className="rounded-tl"
              />
              <View className="flex-1 mx-4">
                <Text className="text-base font-bold">
                  {detailedMovies.original_title.length > 40
                    ? detailedMovies.original_title.slice(0, 40) + "..."
                    : detailedMovies.original_title}
                </Text>
                <Text className="text-sm font-semibold text-neutral-400">
                  {detailedMovies.release_date}
                </Text>
                <Text className="text-xs font-light mt-3">
                  {detailedMovies.overview.length > 100
                    ? detailedMovies.overview.slice(0, 100) + "..."
                    : detailedMovies.overview}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center px-2 py-4">
              <View>
                <Text className="font-semibold text-neutral-500">
                  Time: {detailedMovies.runtime} mins
                </Text>
                <Text className="font-semibold text-neutral-500">Type:</Text>
                {detailedMovies.genres.map((index) => {
                  <Text>{index.name}</Text>;
                })}
              </View>
              <TouchableOpacity
                className="flex-row items-center"
                onPress={() => setLiked(!liked)}
              >
                <HeartIcon size={24} strokeWidth={1} color="#E3463F" />
                <Text className="ml-2 font-semibold text-neutral-500">
                  Liked
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
}
