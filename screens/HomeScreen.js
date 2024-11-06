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
  
  return (
    <StyledLinearGradient
      className="flex-1"
      colors={["#06141b", "#11212d"]}
      locations={[0.2, 1]}
    >
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
                  <Text className="text-neutral-300 text-lg ml-5">Log In</Text>
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
