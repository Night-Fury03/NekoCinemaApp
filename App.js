import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Linking, SafeAreaView } from "react-native";
import { useEffect } from "react";
import RootStack from "./navigators/RootStack";

const linkingConfig = {
  prefixes: ["NekoCinemaApp://"],
  config: {
    screens: {
      RootStack: {
        screens: {
          TabNavigator: {
            screens: {
              HomeStack: "homeStack",
              FavoriteStack: "favoriteStack",
              GiftStack: "giftStack",
              ProfileStack: "profileStack",
            },
          },
          LoginScreen: "login",
          ProfileScreen: "profile",
        },
      },
      HomeStack: {
        screens: {
          HomeScreen: "home",
          SearchScreen: "search",
          MovieScreen: "movie",
          PersonScreen: "person",
        },
      },
      FavoriteStack: {
        screens: {
          FavoriteScreen: "favorite",
        },
      },
      GiftStack: {
        screens: {
          GiftScreen: "gift",
        },
      },
      SearchStack: {
        screens: {
          SearchScreen: "search",
          MovieScreen: "movie",
        },
      },
    },
  },
};

function App() {
  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL(); // Lấy URL ban đầu

      if (url) {
        const route = url.replace(/.*?:\/\//g, ""); // Lấy route từ URL
        // Điều hướng tùy theo deep link nhận được
        if (route === "home") {
          // Điều hướng đến HomeScreen trong HomeStack
          navigation.navigate("HomeStack", { screen: "HomeScreen" });
        } else if (route === "favorite") {
          // Điều hướng đến FavoriteScreen trong FavoriteStack
          navigation.navigate("FavoriteStack", { screen: "FavoriteScreen" });
        } else if (route === "gift") {
          // Điều hướng đến GiftScreen trong GiftStack
          navigation.navigate("GiftStack", { screen: "GiftScreen" });
        } else if (route === "profile") {
          // Điều hướng đến ProfileScreen
          navigation.navigate("ProfileStack", { screen: "ProfileScreen" });
        }
      }
    };

    handleDeepLink(); // Gọi hàm xử lý

    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer linking={linkingConfig}>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
