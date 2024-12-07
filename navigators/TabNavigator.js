import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import GiftStack from './GiftStack';
import ProfileStack from './ProfileStack';
import { HeartIcon, HomeIcon, GiftIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { AuthContext } from '../constants/AuthContext';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { getAccountID } from "../api/getAccountID";



const Tab = createBottomTabNavigator();

function TabBarIcon({ isFocused, IconComponent }) {
    // Giá trị sharedValue để lưu trữ trạng thái phóng to
    const scale = useSharedValue(1);

    // Cập nhật giá trị sharedValue khi `focused` thay đổi
    useFocusEffect(
        React.useCallback(() => {
            scale.value = withTiming(isFocused ? 1.2 : 1, { duration: 200 });
        }, [isFocused])
    );


    // Tạo animated style để áp dụng hiệu ứng phóng to
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View style={animatedStyle}>
            <IconComponent size={isFocused ? 36 : 28} color={isFocused ? '#F5C51C' : '#9e9e9e'} />
        </Animated.View>
    );
}


export default function TabNavigator() {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext); // Lấy trạng thái đăng nhập
    const { login } = useContext(AuthContext); // Lấy trạng thái đăng nhập
    const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị popup
    const [accountId, setAccountId] = useState(null);

    useEffect(() => {
        if (accountId) {
            login()
        }
    }, [accountId])

    useEffect(() => {
        if (!isLoggedIn) {
            setAccountId(null)
        }
    }, [isLoggedIn])

    const handleLoginRedirect = () => {
        setIsModalVisible(false); // Đóng modal
        getAccountID(setAccountId)
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Bạn cần đăng nhập để truy cập tính năng này.</Text>
                        <View style={styles.modalConfirm}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.buttonText}>Đóng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton} onPress={handleLoginRedirect}>
                                <Text style={styles.buttonText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    if (route.name === 'HomeTab') {
                        return <TabBarIcon isFocused={focused} IconComponent={HomeIcon} />;
                    } else if (route.name === 'FavoriteTab') {
                        return <TabBarIcon isFocused={focused} IconComponent={HeartIcon} />;
                    } else if (route.name === 'GiftTab') {
                        return <TabBarIcon isFocused={focused} IconComponent={GiftIcon} />;
                    } else if (route.name === 'ProfileTab') {
                        return <TabBarIcon isFocused={focused} IconComponent={UserIcon} />;
                    }
                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 60,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#11212d',
                },
                headerShown: false
            })}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStack}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            // Ngăn chặn hành vi điều hướng mặc định
                            e.preventDefault();

                            // Reset ngăn xếp về HomeScreen
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeTab' }],
                            });
                        },
                    })}
                />
                <Tab.Screen
                    name="FavoriteTab"
                    component={FavoriteStack}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            if (!isLoggedIn) {
                                e.preventDefault(); // Ngăn điều hướng nếu chưa đăng nhập
                                setIsModalVisible(true); // Hiển thị thông báo
                            } else {
                                // Reset ngăn xếp về FavoriteScreen
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'FavoriteTab' }],
                                });
                            }
                        },
                    })}
                />
                <Tab.Screen
                    name="GiftTab"
                    component={GiftStack}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            // Ngăn chặn hành vi điều hướng mặc định
                            e.preventDefault();

                            // Reset ngăn xếp về HomeScreen
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'GiftTab' }],
                            });
                        },
                    })}
                />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileStack}
                    listeners={() => ({
                        tabPress: (e) => {
                            if (!isLoggedIn) {
                                e.preventDefault(); // Ngăn điều hướng nếu chưa đăng nhập
                                setIsModalVisible(true); // Hiển thị thông báo
                            } else {
                                // Reset ngăn xếp về HomeScreen
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'ProfileTab' }],
                                });
                            }
                        },
                    })}
                />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalConfirm: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8
    },
    loginButton: {
        flex: 1,
        backgroundColor: '#F5C51C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButton: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});
