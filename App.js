import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Linking, SafeAreaView } from "react-native";
import { useEffect } from "react";
import RootStack from './navigators/RootStack';


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
      console.log(url)
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
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
