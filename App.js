import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import RootStack from "./navigators/RootStack";

const linkingConfig = {
  prefixes: ["NekoCinemaApp://"],
  config: {
    screens: {
      RootStack: {
        screens: {
          Main: "main", // Đường dẫn đến RootStack
          Login: "login", // Đường dẫn đến màn hình Login
          Profile: "profile", // Đường dẫn đến màn hình Profile
        },
      },
      TabNavigator: {
        screens: {
          HomeTab: "home", // Đường dẫn đến HomeTab
          FavoriteTab: "favorite", // Đường dẫn đến FavoriteTab
          GiftTab: "gift", // Đường dẫn đến GiftTab
          ProfileTab: "profile", // Đường dẫn đến ProfileTab
        },
      },
      HomeStack: {
        screens: {
          Home: "home", // Đường dẫn đến HomeScreen
          Search: "search", // Đường dẫn đến SearchScreen
          Movie: "movie", // Đường dẫn đến MovieScreen
          Person: "person", // Đường dẫn đến PersonScreen
        },
      },
      FavoriteStack: {
        screens: {
          Favorite: "favorite", // Đường dẫn đến FavoriteScreen
        },
      },
      GiftStack: {
        screens: {
          Gift: "gift", // Đường dẫn đến GiftScreen
        },
      },
      ProfileStack: {
        screens: {
          Profile: "profile", // Đường dẫn đến ProfileScreen
        },
      },
    },
  },
};

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer linking={linkingConfig}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
