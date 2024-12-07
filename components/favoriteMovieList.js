import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HeartIcon } from "react-native-heroicons/solid";
import { detailedMovieList } from "../api/getDetailsMovies";
import { imgBaseUrl } from "../constants";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

export default function FavoriteMovieList({ data }) {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(true);

  const ITEM_HEIGHT = height * 0.2;

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
        return (
          <TouchableOpacity
            key={index}
            className="rounded bg-customGray mb-8 mx-4"
            onPress={() => {

              navigation.navigate("Movie", item)
            }}
          >
            <View className="flex-row items-center border-b border-gray-500">
              <Image
                source={{ uri: `${imgBaseUrl}${item.poster_path}` }}
                style={{
                  width: width * 0.24,
                  height: ITEM_HEIGHT,
                }}
                className="rounded-tl"
              />
              <View className="flex-1 mx-4">
                <Text className="text-base font-bold">
                  {item.original_title.length > 40
                    ? item.original_title.slice(0, 40) + "..."
                    : item.original_title}
                </Text>
                <Text className="text-sm font-semibold text-neutral-400">
                  {item.release_date}
                </Text>
                <Text className="text-xs font-light mt-3">
                  {item.overview.length > 100
                    ? item.overview.slice(0, 100) + "..."
                    : item.overview}
                </Text>
              </View>
            </View>
            <View className="flex-row justify-between items-center px-2 py-4">
              <View>
                <Text className="font-semibold text-neutral-500">
                  Time: {item.runtime} mins
                </Text>
                <Text className="font-semibold text-neutral-500">Type:</Text>
                {item.genre_ids.map((index) => (
                  <Text>{index}</Text>
                ))}
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
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
