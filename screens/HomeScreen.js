import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import { styled } from "nativewind";
import { useState } from "react";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { useNavigation } from "@react-navigation/native";
import { getAccountID } from "../api/getAccountID";
import { trendingMovieList } from "../api/getTrendingMovies";
import { playingMovieList } from "../api/getNowShowingMovies";
import { upcomingMovieList } from "../api/getComingSoonMovies";

const ios = Platform.OS == "ios";
const StyledLinearGradient = styled(LinearGradient);
const StyledSafeAreaView = styled(SafeAreaView);

export default function HomeScreen() {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [nowShowingMovieData, setNowShowingMovieData] = useState([]);
  const [upcomingMovieData, setUpcomingMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [login, setLogin] = useState(false);
  const [accountId, setAccountId] = useState(null);
  
  useEffect(() => {
    const fetchTrendingMovieList = async () => {
      const trendingMovieData = await trendingMovieList();
      setTrendingMovie(trendingMovieData["results"]);
    };

    const fetchPlayingMovieList = async () => {
      const nowShowingMovieDataList = await playingMovieList();
      setNowShowingMovieData(nowShowingMovieDataList["results"]);
    };

    const fetchUpcomingMovieList = async () => {
      const upcomingMovieListDataList = await upcomingMovieList();
      setUpcomingMovieData(upcomingMovieListDataList["results"]);
    };

    fetchUpcomingMovieList();
    fetchTrendingMovieList();
    fetchPlayingMovieList();
  }, []);

  return (
    <View className="flex-1 bg-customLinearGradient1">
      {/*  */}
      <StyledSafeAreaView className={ios ? "mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Image source={require("../assets/img/Logo.png")}></Image>


          <View className="flex-row items-center">
            {/* Nút đăng nhập  */}
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size={30} strokeWidth={1} color="white" />
            </TouchableOpacity>

            {
              login ? null :
                <TouchableOpacity onPress={() => getAccountID(setAccountId, setLogin)}>
                  <Text style={{color: 'white'}} className="text-neutral-300 text-lg ml-5">Log In</Text>
                </TouchableOpacity>
            }

          </View>


        </View>
      </StyledSafeAreaView>

      {/* body */}
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          <TrendingMovies data={trendingMovie} />

          {/* Now Showing */}
          <MovieList title="Now Showing" data={nowShowingMovieData} />

          {/* Coming Soon */}
          <MovieList title="Coming Soon" data={upcomingMovieData} />
        </ScrollView>
      )}
    </View>
  );
}
