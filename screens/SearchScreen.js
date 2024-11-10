import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS == "ios";
var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  let movieName = "Black Clover";

  return (
    <LinearGradient
      className="flex-1"
      colors={["#06141b", "#11212d"]}
      locations={[0.2, 1]}
    >
      <SafeAreaView className={ios ? "mb-2" : "mb-3"}>
        <View className="flex-row justify-between items-center mx-4">
          <Image source={require("../assets/img/Logo.png")}></Image>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon size={30} strokeWidth={1} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View className="flex-row items-center justify-between px-4 mt-4 mx-4 mb-3 border border-neutral-500 rounded-xl">
        <TextInput
          placeholder="Sreach Movie"
          placeholderTextColor={"gray"}
          value={inputValue}
          className="p-2 mx-2 text-white flex-1 text-base font-semibold tracking-wider"
          onChangeText={(text) => setInputValue(text)}
        />
        {inputValue.length > 0 && (
          <TouchableOpacity onPress={() => setInputValue("")}>
            <XMarkIcon size={24} strokeWidth={1} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* results */}

      {results.length > 0 ? (
        <ScrollView
          className="mt-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text className="text-white font-semibold mb-4">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      source={require("../assets/img/blackClover.jpg")}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 flex-row justify-center items-center">
          <Text className="text-neutral-500">
            No results for searching movies
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}
