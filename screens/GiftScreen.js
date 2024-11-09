import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GiftList from '../components/giftList';


const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = height * 0.28

export default function GiftScreen() {
    const [vouchers, setVouchers] = useState([1, 2, 3])
    const [myVouchers, setMyVouchers] = useState([1, 2])

    const [choose, setChoose] = useState('Vouchers');
    const headerPosition = useRef(new Animated.Value(-HEADER_HEIGHT)).current;

    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.2)).current;

    const underlinePosition = useRef(new Animated.Value(0)).current;
    const underlineWidth = useRef(new Animated.Value(0)).current;
    const translateYVouchers = useRef(new Animated.Value(-5)).current; // Nhích lên mặc định cho Vouchers
    const translateYMyVouchers = useRef(new Animated.Value(0)).current;

    const containerRef = useRef(null);
    const vouchersTextRef = useRef(null);
    const myVouchersTextRef = useRef(null);

    // Hàm đo chiều rộng và vị trí của chữ
    const measureText = async (textRef) => {
        return new Promise((resolve) => {
            if (textRef.current && containerRef.current) {
                textRef.current.measureLayout(containerRef.current, (x, y, width) => {
                    resolve({ x, width });
                });
            }
        });
    };

    useEffect(() => {
        Animated.parallel([
            Animated.timing(headerPosition, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 200,
                delay: 300,
                useNativeDriver: false,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                delay: 300,
                useNativeDriver: false,
            }),
        ]).start();
    }, [])

    // Đồng bộ tất cả hiệu ứng khi lựa chọn thay đổi
    useEffect(() => {
        const updateUnderline = async () => {
            let measureResult;
            if (choose === 'Vouchers') {
                measureResult = await measureText(vouchersTextRef);
            } else {
                measureResult = await measureText(myVouchersTextRef);
            }

            if (measureResult) {
                const { x, width } = measureResult;

                // Sử dụng Animated.parallel để đảm bảo tất cả các hiệu ứng diễn ra đồng bộ
                Animated.parallel([
                    Animated.spring(underlineWidth, {
                        toValue: width,
                        friction: 6,
                        tension: 60,
                        useNativeDriver: false,
                    }),
                    Animated.spring(underlinePosition, {
                        toValue: x,
                        friction: 6,
                        tension: 60,
                        useNativeDriver: false,
                    }),
                    Animated.spring(translateYVouchers, {
                        toValue: choose === 'Vouchers' ? -5 : 0,
                        friction: 6,
                        tension: 60,
                        useNativeDriver: true,
                    }),
                    Animated.spring(translateYMyVouchers, {
                        toValue: choose === 'My Vouchers' ? -5 : 0,
                        friction: 6,
                        tension: 60,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        };

        updateUnderline();
    }, [choose]);

    const handleTypeSelect = (type) => {
        if (choose !== type) {
            setChoose(type);
        }
    };

    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <Animated.View className="relative items-center bg-customGray rounded-b-3xl mb-8"
                style={{
                    height: HEADER_HEIGHT,
                    transform: [{ translateY: headerPosition },]
                }}
            >
                <Animated.View
                    ref={containerRef}
                    className="absolute p-3 rounded-3xl bottom-6 flex-row justify-between items-center bg-customBlack"
                    style={{
                        transform: [{ scale: scale }],
                        opacity: opacity
                    }}
                >
                    <TouchableOpacity className="px-2 items-center" onPress={() => handleTypeSelect('Vouchers')}>
                        <Animated.Text
                            ref={vouchersTextRef}
                            style={{
                                transform: [{ translateY: translateYVouchers }],
                                color: choose === 'Vouchers' ? '#FFD700' : 'white'
                            }}
                            className="text-lg font-semibold"
                        >
                            Vouchers
                        </Animated.Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="px-2 items-center" onPress={() => handleTypeSelect('My Vouchers')}>
                        <Animated.Text
                            ref={myVouchersTextRef}
                            style={{
                                transform: [{ translateY: translateYMyVouchers }],
                                color: choose === 'My Vouchers' ? '#FFD700' : 'white'
                            }}
                            className="text-lg font-semibold"
                        >
                            My Vouchers
                        </Animated.Text>
                    </TouchableOpacity>

                    <Animated.View
                        style={{
                            position: 'absolute',
                            bottom: 4,
                            height: 2,
                            backgroundColor: '#FFD700',
                            width: underlineWidth,
                            transform: [{ translateX: underlinePosition }]
                        }}
                    />
                </Animated.View>

            </Animated.View>

            <GiftList data={choose === 'Vouchers' ? vouchers : myVouchers } />
        </LinearGradient>
    );
}
