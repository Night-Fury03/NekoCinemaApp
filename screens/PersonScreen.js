import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { detailsPeopleList } from "../api/getDetailsPeople";
import { imgBaseUrl } from "../constants";
import { detailsCreditsList } from "../api/getDetailsCreditsMovie";
import { moviesCreditsList } from "../api/getMoviesCredits";

const ios = Platform.OS == "ios";

export default function PersonScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [detailsPeople, setDetailsPeople] = useState([1, 2, 3, 4, 5]);
  const [creditsMovie, setCreditsMovie] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetailsPeopleList = async () => {
      const detailsPeopleData = await detailsPeopleList(
        JSON.stringify(item.id)
      );
      setDetailsPeople(detailsPeopleData);
    };

    const fetchDetailsCreditData = async () => {
      const creditsMovieData = await detailsCreditsList(item.credit_id);
      setCreditsMovie(creditsMovieData);
    };

    const fetchMoviesCreditData = async () => {
      const moviesCreditsData = await moviesCreditsList(item.id);
      setPersonMovies(moviesCreditsData["cast"]);
    };

    fetchMoviesCreditData();
    fetchDetailsCreditData();
    fetchDetailsPeopleList();
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
        <ScrollView>
          <View className="w-full mt-8">
            <TouchableOpacity
              className="px-4 top-2 left-0"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
            </TouchableOpacity>

            <View className="items-center mt-6">
              {/* avatar */}
              <View
                className="rounded-full overflow-hidden h-64 w-64"
                style={{
                  // íos
                  shadowColor: "gray",
                  shadowOpacity: 1,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 5 },
                  // android
                  elevation: 20,
                }}
              >
                <Image
                  source={{ uri: `${imgBaseUrl}${detailsPeople.profile_path}` }}
                  className="h-full w-full"
                />
              </View>

              {/* Name */}
              <View className="mt-6">
                <Text className="text-3xl text-white font-bold text-center">
                  {detailsPeople.name}
                </Text>
                <Text className="text-base text-neutral-500 text-center">
                  {detailsPeople.place_of_birth}
                </Text>
              </View>

              <View className="p-4 mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Gender</Text>
                  {detailsPeople.gender === 1 ? (
                    <Text className="text-neutral-300 font-sm">Female</Text>
                  ) : (
                    <Text className="text-neutral-300 font-sm">Male</Text>
                  )}
                </View>

                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Birthday</Text>
                  <Text className="text-neutral-300 font-sm">
                    {detailsPeople.birthday}
                  </Text>
                </View>

                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Known for</Text>
                  <Text className="text-neutral-300 font-sm">
                    {creditsMovie.job}
                  </Text>
                </View>

                <View className="px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 font-sm">
                    {detailsPeople.popularity}
                  </Text>
                </View>
              </View>
            </View>

            {/* Biography */}
            <View className="my-6 mx-4">
              <Text className="text-customOrange font-semibold text-lg my-2">
                Biography
              </Text>
              <Text className="text-neutral-400">
                {detailsPeople.biography}
              </Text>
            </View>

            {/* Movie */}
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        </ScrollView>
      )}
    </LinearGradient>
  );
}
