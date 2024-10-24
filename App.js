import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import PersonScreen from "./screens/PersonScreen";
import SearchScreen from "./screens/SearchScreen";
import LoginScreen from "./screens/LoginScreen";
import { Linking, SafeAreaView } from "react-native";
import { useEffect } from "react";

const Stack = createNativeStackNavigator();

function App() {
  // Định nghĩa cấu hình deep linking
  const linkingConfig = {
    prefixes: ["NekoCinemaApp://"],
    config: {
      screens: {
        Home: "home",
        Movie: "movie",
        Person: "person",
        Search: "search",
        Login: "login",
      },
    },
  };

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL(); // Lấy URL ban đầu
      if (url) {
        const route = url.replace(/.*?:\/\//g, ""); // Lấy route từ URL
        if (route === "Home") {
          navigation.navigate("Home"); // Điều hướng về Home Screen
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Movie"
            component={MovieScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Person"
            component={PersonScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
