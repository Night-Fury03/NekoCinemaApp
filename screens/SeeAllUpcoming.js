import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { imgBaseUrl } from "../constants";
import { upcomingMovieList } from "../api/getComingSoonMovies";



var { width, height } = Dimensions.get("window");

export default function SeeAllUpcoming() {
  const [upcomingMovie, setUpcomingMovie] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    fetchUpcomingMovieList();
  }, []);

  const fetchUpcomingMovieList = async () => {
    const upcomingMovieListDataList = await upcomingMovieList();
    setUpcomingMovie(upcomingMovieListDataList["results"]);
  };


  return (
    <View className="flex-1 bg-customLinearGradient1">
      {/* movie row */}
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 15 }}
        className="flex-1 pt-6"
      >
        <View className="flex-1 flex flex-row flex-wrap justify-around">
          {upcomingMovie.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-1 mr-4 mb-6">
                  <Image
                    source={{ uri:  `${imgBaseUrl}${item.poster_path}` }}
                    style={{
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                    className="rounded-3xl"
                  />
                  <Text className="text-neutral-300 ml-1">
                    {item.original_title.length > 14
                      ? item.original_title.slice(0, 14) + "..."
                      : item.original_title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
