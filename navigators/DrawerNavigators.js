import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SeeAllUpcoming from "../screens/SeeAllUpcoming";
import SeeAllTrending from "../screens/SeeAllTrending";
import SeeAllNowPlaying from "../screens/SeeAllNowPlaying";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { XMarkIcon } from "react-native-heroicons/outline";

const Drawer = createDrawerNavigator();

export default function DrawerNavigators() {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: '#11212d' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <MaterialIcons name="menu" size={28} color="white" style={{ marginLeft: 15 }} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <XMarkIcon name="exit" size={28} color="white" style={{ marginRight: 15 }} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Drawer.Screen name="Trending" component={SeeAllTrending} />
            <Drawer.Screen name="Now Playing" component={SeeAllNowPlaying}/>
            <Drawer.Screen name="Upcoming" component={SeeAllUpcoming} />
        </Drawer.Navigator>
    );
}
