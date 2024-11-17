import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { imgBaseUrl } from "../constants";

export default function Cast({ cast, navigation }) {
  return (
    <View className="flex-row pt-3">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cast.cast &&
          cast.cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="items-center mr-4"
                onPress={() => navigation.navigate("Person", person)}
              >
                <View className="overflow-hiden rounded-full h-20 w-20 items-center border border-neutral-500">
                  {person.profile_path ? (
                    <Image
                      className="rounded-full h-20 w-20"
                      source={{ uri: `${imgBaseUrl}${person.profile_path}` }}
                    />
                  ) : (
                    <Image
                      className="rounded-full h-20 w-20"
                      source={require("../assets/img/ava1.png")}
                    />
                  )}
                </View>
                <Text className="text-white text-xs mt-1">
                  {person.character.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {person.name.length > 10
                    ? person.name.slice(0, 10) + "..."
                    : person.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
