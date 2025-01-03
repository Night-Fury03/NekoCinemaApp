import React, { useCallback, useState } from "react";
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
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchSearchMovie } from "../api/MovieDB";
import debounce from "lodash.debounce";
import { imgBaseUrl } from "../constants";

const ios = Platform.OS == "ios";
var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleSearch = value => {
    if (value && value.length > 2) {
      setLoading(true)
      fetchSearchMovie({
        query: value,
        include_adult: false,
        language: "en-US",
        page: '1'
      }).then(data => {
        setLoading(false)
        if (data && data.results) setResults(data.results)
      })
    } else {
      setLoading(false)
      setResults([])
    }
  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <View className="flex-1 bg-customLinearGradient1">
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
          onChangeText={(text) => {
            setInputValue(text); // Cập nhật state
            handleTextDebounce(text); // Gọi debounce
          }}
        />
        {inputValue.length > 0 && ( // Hiển thị nút xóa nếu có văn bản
          <TouchableOpacity
            className="rounded-full p-2 bg-neutral-600"
            onPress={() => {
              setInputValue(""); // Xóa nội dung input
              setResults([]); // Xóa kết quả tìm kiếm
            }}
          >
            <XMarkIcon size={24} strokeWidth={1} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* results */}

      {loading ? (<Loading />) : results.length > 0 ? (
        <ScrollView
          className="space-y-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <Text className="text-white font-semibold ml-1">Results ({results.length})</Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      // source={require("../assets/img/blackClover.jpg")}
                      source={{ uri:`${imgBaseUrl}${item.poster_path}` }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      className="rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
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
    </View>
  );
}
