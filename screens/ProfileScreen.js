import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  HeartIcon,
  QuestionMarkCircleIcon,
  TicketIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { detailsAccount } from "../api/getDetailsAccount";
import { imgBaseUrl } from "../constants";
import { AuthContext } from '../constants/AuthContext';


export default function PersonScreen() {
  const navigation = useNavigation();
  const [responses, setResponses] = useState({});
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const [imageUrl, setImageUrl] = useState(null);

  const { logout } = useContext(AuthContext); // Lấy trạng thái đăng nhập


  useEffect(() => {
    translateY.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withTiming(1, { duration: 500 });

    const account = async () => {
      try {
        const account_ID = await AsyncStorage.getItem("accountID");
        const session_ID = await AsyncStorage.getItem("sessionID");
        const responsesData = await detailsAccount(account_ID, session_ID);
        setImageUrl(responsesData.avatar.tmdb.avatar_path);
        setResponses(responsesData);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };

    account();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const animatedOpacity = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 bg-customLinearGradient1">
      <View className="w-full mt-8">
        <Animated.View
          style={animatedStyle}
          className="bg-customGrayDark h-28 mx-6 rounded-xl justify-center items-center mt-12"
        >
          {/* avatar */}
          <View
            className="absolute bottom-20 rounded-full overflow-hidden h-16 w-16"
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
            {imageUrl ? (
              <Image
                source={{
                  uri: `${imgBaseUrl}${imageUrl}`,
                }}
                className="h-full w-full"
              />
            ) : (
              <Image
                source={require("../assets/img/blackClover.jpg")}
                className="h-full w-full"
              />
            )}
          </View>

          <Text className="text-lg">{responses.username}</Text>
        </Animated.View>

        <Animated.View
          style={animatedOpacity}
          className="rounded-xl border border-neutral-400 py-6 px-4 mx-6 mt-8"
        >
          <TouchableOpacity className="py-4 flex-row items-center"
            onPress={() => {
              navigation.navigate("FavoriteTab"); // Điều hướng đến tab Home
            }}
          >
            <HeartIcon size={30} strokeWidth={1} color="white" />
            <Text className="text-neutral-300 text-lg ml-2">
              Favorite Movies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row items-center"
            onPress={() => {
              navigation.navigate("MyTickets");
            }}
          >
            <TicketIcon size={30} strokeWidth={1} color="white" />
            <Text className="text-neutral-300 text-lg ml-2">My Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row items-center">
            <Cog6ToothIcon size={30} strokeWidth={1} color="white" />
            <Text className="text-neutral-300 text-lg ml-2">Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row items-center">
            <QuestionMarkCircleIcon size={30} strokeWidth={1} color="white" />
            <Text className="text-neutral-300 text-lg ml-2">
              Help and Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-4 flex-row items-center"
            onPress={() => {
              logout()
              navigation.navigate("HomeTab"); // Điều hướng đến tab Home
            }}
          >
            <ArrowLeftEndOnRectangleIcon size={30} strokeWidth={1} color="white" />
            <Text className="text-neutral-300 text-lg ml-2">Log out</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}
