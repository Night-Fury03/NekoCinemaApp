import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  Button,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
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
import { detailedMovieList } from "../api/getDetailsMovies";
import { imgBaseUrl } from "../constants";
import { castMovieList } from "../api/getCastMovie";
import { similarMovieList } from "../api/getSimilarMovie";
import { postAddRemoveFavoriteMovies } from "../api/MovieDB";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { favoriteMoviesAccount } from "../api/getFavoriteMoviesAccount";
import { apiKey } from "../constants";
import YoutubePlayer from "react-native-youtube-iframe";
import { getAccountID } from "../api/getAccountID";
import { AuthContext } from "../constants/AuthContext";

var { width, height } = Dimensions.get("window");

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [detailsMovie, setDetailsMovie] = useState({});
  const [like, setLike] = useState(false);
  const [cast, setCast] = useState({});
  const [similarMovie, setSimilarMovie] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalLoginVisible, setIsModalLoginVisible] = useState(false); // Trạng thái hiển thị popup
  const { isLoggedIn } = useContext(AuthContext); // Lấy trạng thái đăng nhập
  const [accountId, setAccountId] = useState(null);
  const { login } = useContext(AuthContext); // Lấy trạng thái đăng nhập

  useEffect(() => {
    if (accountId) {
      login();
    }
  }, [accountId]);

  useEffect(() => {
    if (!isLoggedIn) {
      setAccountId(null);
    }
  }, [isLoggedIn]);

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

    const fetchFavoriteMoviesAccountList = async () => {
      if (await AsyncStorage.getItem("accountID")) {
        const account_ID = await AsyncStorage.getItem("accountID");
        const session_ID = await AsyncStorage.getItem("sessionID");
        const favoriteMoviesAccountData = await favoriteMoviesAccount(
          JSON.stringify(account_ID),
          session_ID
        );
        if (
          favoriteMoviesAccountData["results"].some(
            (movie) => movie.id === item.id
          )
        ) {
          setLike(true);
        }
      } else return;
    };

    const fetchVideoKey = async () => {
      const url = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${apiKey}`;

      try {
        const response = await axios.get(url);
        const videos = response.data.results;

        // Lấy trailer từ YouTube
        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);
      } catch (error) {
        console.error("Error fetching video key:", error);
      }
    };

    fetchVideoKey();
    fetchFavoriteMoviesAccountList();
    fetchSimilarMovieList();
    fetchDetailsMovieList();
    fetchCreditsMovieList();
  }, []);

  const AddToFavorite = async (id) => {
    if (isLoggedIn) {
      const account_ID = await AsyncStorage.getItem("accountID");
      const session_ID = await AsyncStorage.getItem("sessionID");
      if (like === true) {
        setLike(!like);
        await postAddRemoveFavoriteMovies(id, false, account_ID, session_ID);
      } else {
        setLike(!like);
        await postAddRemoveFavoriteMovies(id, true, account_ID, session_ID);
      }
    } else {
      setLike(false);
      setIsModalLoginVisible(true);
    }
  };

  const confirmLogin = () => {
    if (!isLoggedIn) {
      setIsModalLoginVisible(true);
    } else {
      navigation.navigate("Booking", {
        item: item,
        detailsMovie: detailsMovie,
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleLoginRedirect = () => {
    setIsModalLoginVisible(false); // Đóng modal
    getAccountID(setAccountId);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalLoginVisible}
        onRequestClose={() => setIsModalLoginVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Bạn cần đăng nhập để truy cập tính năng này.
            </Text>
            <View style={styles.modalConfirm}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalLoginVisible(false)}
              >
                <Text style={styles.buttonText}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginRedirect}
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View className="flex-1 bg-customLinearGradient1">
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View className="flex-1 justify-center items-center bg-customOverlay">
              <YoutubePlayer
                height={300}
                width={300}
                play={true}
                videoId={videoKey}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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

              <TouchableOpacity onPress={toggleModal}>
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
            <View className="my-4 items-end right-6">
              <Text className="w-1/2 text-right text-white font-semibold text-3xl">
                {detailsMovie.original_title}
              </Text>
              <Text className="w-1/2 text-right text-white font-light text-md">
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
                        style={{ marginRight: 8 }}
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
                    onPress={() => AddToFavorite(item.id)}
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

        <View className="absolute w-full bottom-4">
          <TouchableOpacity
            className="bg-customPink py-1.5 mx-6 rounded-xl items-center"
            onPress={() => confirmLogin()}
          >
            <Text className="text-white text-base">Booking Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalConfirm: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#F5C51C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButton: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
