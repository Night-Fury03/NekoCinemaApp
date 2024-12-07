import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import RootStack from "./navigators/RootStack";
import { AuthProvider } from "./constants/AuthContext";


function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}

export default App;
