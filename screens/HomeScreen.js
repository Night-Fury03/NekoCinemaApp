import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3Icon,
  FilmIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  TicketIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { styled } from "nativewind";
import { useState } from "react";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import { useNavigation } from "@react-navigation/native";
import { getAccountID } from "../api/getAccountID";

const ios = Platform.OS == "ios";
const StyledLinearGradient = styled(LinearGradient);
const StyledSafeAreaView = styled(SafeAreaView);

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [showing, setShowing] = useState([1, 2, 3]);
  const [coming, setComing] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const [login, setLogin] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const pressLogin = () => {
    !login ? getAccountID(setAccountId, setLogin) : navigation.navigate("Search"); 
  };
  return (
    <StyledLinearGradient
      className="flex-1"
      colors={["#1d1d1d", "#1C2743"]}
      locations={[0.2, 1]}
    >
      {/*  */}
      <StyledSafeAreaView className={ios ? "mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Image source={require("../assets/img/Logo.png")}></Image>

          {/* Nút đăng nhập  */}
          <TouchableOpacity onPress={pressLogin}> 
            <MagnifyingGlassIcon size={30} strokeWidth={1} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={1} color="white" />
          </TouchableOpacity>
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
          <TrendingMovies data={trending} />

          {/* Now Showing */}
          <MovieList title="Now Showing" data={showing} />

          {/* Coming Soon */}
          <MovieList title="Coming Soon" data={coming} />
        </ScrollView>
      )}
    </StyledLinearGradient>
  );
}
