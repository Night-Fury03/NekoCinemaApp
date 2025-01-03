import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { imgBaseUrl } from "../constants";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = async (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.62}
        autoplay={true} // Kích hoạt autoplay
        autoplayDelay={1000} // Độ trễ khi bắt đầu autoplay (mili giây)
        autoplayInterval={3000} // Thời gian giữa các slide (mili giây)
        loop={true} // Kích hoạt lặp vô hạn
        inactiveSlideScale={0.7}
        inactiveSlideOpacity={0.6}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: `${imgBaseUrl}${item.poster_path}` }}
        style={{
          width: "100%",
          height: height * 0.4,
        }}
        resizeMode="contain"
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
