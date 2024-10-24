import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { fetchNowPlayingsMovieEndpoint } from "../api/MovieDB";
var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  fetchNowPlayingsMovieEndpoint();
  let movieName = "SuperBatNman & sipderAquarium: infinity war";
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-customOrange text-lg">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require("../assets/img/ava1.png")}
                  style={{
                    width: width * 0.5,
                    height: height * 0.32,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
