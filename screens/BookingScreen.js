import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Platform } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { time, day, chair, FoodDrink } from '../index'

const ios = Platform.OS == 'ios'

export default function BookingScreen() {
    const navigation = useNavigation();
    const movieName = "Black Clover"

    const scrollViewRef = useRef(null);
    const ticketsRef = useRef(null);
    const chairsRef = useRef(null);

    const [selectedDay, setSelectedDay] = useState(1);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedChairs, setSelectedChairs] = useState([]);


    const [maxChairInRow, setMaxChairInRow] = useState(0);
    const [chairInRow, setChairInRow] = useState([]);

    const [isModalVisible, setModalVisible] = useState(false); // Modal visibility
    const [foodAndDrinks, setFoodAndDrinks] = useState([]); // Food & drinks list

    const [tempSelection, setTempSelection] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [canScrollBeyondChairs, setCanScrollBeyondChairs] = useState(false); // Kiểm soát vùng cuộn
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [isAboveChairs, setIsAboveChairs] = useState(true); // Theo dõi vị trí cuộn



    const isSelectionComplete = selectedDay !== null && selectedTime !== null && selectedChairs.length > 0;


    // Function to toggle modal visibility
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Add or Edit selection
    const handleSave = () => {
        setFoodAndDrinks(tempSelection);
        // Tính tổng giá của Food & Drinks
        const foodTotal = tempSelection.reduce((sum, item) => sum + item.cost * item.quantity, 0);

        // Cộng thêm giá ghế đã chọn
        const chairTotal = selectedChairs.length * 2; // 2$ mỗi ghế

        setTotalPrice(foodTotal + chairTotal);
        setModalVisible(false); // Close modal
    };


    const findMaxCountChairInRow = (item) => {
        const count = item.position.length
        if (count > maxChairInRow) {
            setMaxChairInRow(count)
        }
    }

    useEffect(() => {
        const rowArray = (count) => {
            const res = Array.from({ length: count }, (_, index) => index + 1)
            setChairInRow(res)
            return res
        }
        rowArray(maxChairInRow)
    }, [])

    const handleScroll = (event) => {
        const yOffset = event.nativeEvent.contentOffset.y;

        if (chairsRef.current) {
            chairsRef.current.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    // Kiểm tra nếu vị trí hiện tại nằm trên hoặc dưới phần ghế
                    if (yOffset < y && !isAboveChairs) {
                        setIsAboveChairs(true); // Hiển thị nút Next
                    } else if (yOffset >= y && isAboveChairs) {
                        setIsAboveChairs(false); // Ẩn nút Next
                    }
                    console.log("yOffset: " + yOffset)
                    console.log("y: " + y)

                },
                () => {
                    console.error("Failed to measure layout for chairsRef");
                }
            );
        }
    };


    const scrollToTickets = () => {
        if (ticketsRef.current) {
            ticketsRef.current.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
                },
                () => {
                    console.error("Layout measurement failed");
                }
            );
        }
    };


    return (
        <LinearGradient className="flex-1" colors={["#06141b", "#11212d"]} locations={[0.2, 1]}>
            <View className="absolute z-10 my-8">
                <TouchableOpacity className="px-4 top-1" onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
                </TouchableOpacity>
            </View>
            <View className="w-full my-8 items-center justify-center">
                <Text className="text-white text-3xl">{movieName}</Text>
            </View>

            <ScrollView
                ref={scrollViewRef}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'left', paddingBottom: 50 }}
                onScroll={handleScroll} // Theo dõi cuộn
                scrollEventThrottle={16} // Tăng độ nhạy của sự kiện cuộn
            >


                {/* chọn ngày chiếu */}
                <View className="w-full flex-row">
                    <View className="mr-4 px-3 h-14 bg-customGray rounded-r-2xl justify-center">
                        <Text className="text-lg">DEC</Text>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {day.map((item, index) => {
                            const isSelected = selectedDay === item.id;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    className={`w-16 mr-4 px-3 rounded-2xl justify-center items-center ${isSelected ? 'bg-customYellow' : 'bg-white'}`}
                                    onPress={() => setSelectedDay(item.id)}
                                >

                                    <Text>{item.thu}</Text>
                                    <Text>{item.day}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                <View className="w-full mt-8 ml-4">
                    <Text className="text-customOrange text-lg">Show time</Text>
                </View>

                {/* chọn giờ chiếu tương ứng với ngày */}
                <View className="w-full flex-row flex-wrap mt-8 px-4 justify-center items-center">
                    {time.map((item, index) => {
                        const isSelected = selectedTime === index;
                        if (item.dayID === selectedDay) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    className={`w-20 mr-4 mb-4 p-3 rounded-lg justify-center items-center ${isSelected ? 'bg-customYellow' : 'border border-neutral-400'}`}
                                    onPress={() => setSelectedTime(index)}
                                >
                                    <Text className={`${isSelected ? '' : 'text-white'}`}>{item.time}</Text>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>

                {/* Màn hình */}
                <View className="relative mt-8 items-center justify-center">
                    <View style={{
                        height: 70,
                        transform: [{ perspective: 150 }, { rotateX: '-15deg' }],
                    }}
                        className="w-10/12 bg-customPink border border-neutral-400"
                    >
                    </View>
                    <Text className="absolute text-white text-lg">Screen</Text>
                </View>

                {/* lựa chọn ghế */}

                <View className="w-full mt-4 flex-row">
                    <View className="w-1/12 justify-between">
                        {
                            chair.map((item, index) => {
                                return (
                                    <View key={index} className="border border-transparent my-1 w-6 h-6">
                                        <Text className="text-white text-center" key={index}>{item.name}</Text>
                                    </View>
                                );
                            })
                        }
                    </View>

                    <View className='flex-1 justify-center items-center'>
                        {
                            chair.map((row, rowIndex) => {
                                findMaxCountChairInRow(row)
                                return (
                                    <View key={rowIndex} className="flex-row justify-center items-center">
                                        {
                                            row.position.map((position, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        key={index}
                                                        className={`m-1 w-6 h-6 rounded-lg ${selectedChairs.includes(position) ? 'bg-customYellow' : 'border border-neutral-400'
                                                            }`}
                                                        onPress={() => {
                                                            setSelectedChairs((prev) =>
                                                                prev.includes(position)
                                                                    ? prev.filter((chair) => chair !== position) // Bỏ ghế nếu đã chọn
                                                                    : [...prev, position] // Thêm ghế nếu chưa chọn
                                                            );
                                                        }}
                                                    />

                                                )
                                            })
                                        }
                                    </View>
                                );
                            })
                        }
                    </View>
                </View>

                <View className="w-full flex-row justify-end mt-1">
                    <View className="w-11/12 flex-row justify-center items-center ">
                        {
                            chairInRow.map((item, index) => {
                                return (
                                    <View key={index} className="border border-transparent mx-1 w-6 h-6">
                                        <Text className="text-white text-center" key={index}>{item}</Text>
                                    </View>
                                );
                            })

                        }
                    </View>
                </View>

                <View ref={chairsRef} className="mx-8 mt-8 flex-row justify-between items-center">
                    <View className="items-center">
                        <View className="border border-neutral-400 p-3 px-6 rounded-lg"></View>
                        <Text className="mt-1 text-white">Avaiable</Text>
                    </View>

                    <View className="items-center">
                        <View className="border border-transparent p-3 px-6 rounded-lg bg-customGray"></View>
                        <Text className="mt-1 text-customGray">Booked</Text>
                    </View>

                    <View className="items-center">
                        <View className="border border-transparent p-3 px-6 rounded-lg bg-customYellow"></View>
                        <Text className="mt-1 text-customYellow">Selected</Text>
                    </View>

                </View>

                {/* Modal for selecting Foods & Drinks */}
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={toggleModal}
                >
                    <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View className="w-10/12 p-5 bg-white rounded-lg items-center">
                            <Text className="mb-5 text-lg font-bold" >Choose your items</Text>

                            {/* Example food and drink options */}
                            <View className="w-full">
                                {FoodDrink.map((item) => {
                                    // Check if item already exists in tempSelection
                                    const selectedItem = tempSelection.find((f) => f.id === item.id);
                                    const quantity = selectedItem ? selectedItem.quantity : 0;

                                    return (
                                        <View key={item.id} className="flex-row justify-between items-center mb-2">
                                            <Text className="text-base">{item.name}</Text>

                                            {/* Quantity Controls */}
                                            <View className="flex-row items-center">
                                                {/* Decrease Button */}
                                                <TouchableOpacity
                                                    className="px-4 rounded border border-neutral-400"
                                                    onPress={() => {
                                                        setTempSelection((prev) => {
                                                            const existing = prev.find((f) => f.id === item.id);
                                                            if (existing && existing.quantity > 1) {
                                                                return prev.map((f) =>
                                                                    f.id === item.id
                                                                        ? { ...f, quantity: f.quantity - 1 }
                                                                        : f
                                                                );
                                                            } else {
                                                                return prev.filter((f) => f.id !== item.id);
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <Text className="text-lg">-</Text>
                                                </TouchableOpacity>

                                                {/* Quantity Display */}
                                                <Text className="text-base px-2">{quantity}</Text>

                                                {/* Increase Button */}
                                                <TouchableOpacity
                                                    className="px-4 rounded bg-customYellow"
                                                    onPress={() => {
                                                        const existing = tempSelection.find((f) => f.id === item.id);
                                                        if (existing) {
                                                            setTempSelection((prev) =>
                                                                prev.map((f) =>
                                                                    f.id === item.id
                                                                        ? { ...f, quantity: f.quantity + 1 }
                                                                        : f
                                                                )
                                                            );
                                                        } else {
                                                            setTempSelection((prev) => [...prev, { ...item, quantity: 1 }]);
                                                        }
                                                    }}
                                                >
                                                    <Text className="text-lg">+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity className="w-6/12 mt-5 py-2  rounded-lg bg-customOrange items-center" onPress={handleSave}>
                                <Text className="text-white text-base">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Thông tin vé */}
                {isSelectionComplete && isNextClicked && (
                    <View className="mt-8 items-center">
                        <View className="w-full ml-8">
                            <Text className="text-customOrange text-lg">Your tickets</Text>
                        </View>

                        {/* Selected Seats */}
                        {selectedChairs.length > 0 && (
                            <View className="w-10/12 mt-4">
                                <Text className="text-white text-base mb-1 underline">Selected Seats</Text>
                                <View className="w-full flex-row justify-between">
                                    <View className="w-8/12 ml-2 flex-row flex-wrap">
                                        {selectedChairs.map((chair, index) => (
                                            <Text key={index} className="text-white mr-2">{chair}</Text>
                                        ))}
                                    </View>
                                    <Text className="text-white text-right flex-1">${(selectedChairs.length * 2).toFixed(2)}</Text>
                                </View>
                            </View>
                        )}

                        {foodAndDrinks.length > 0 && (
                            <View className="w-10/12 mt-4">
                                <Text className="text-white text-base mb-1 underline">Foods & Drinks</Text>
                                {foodAndDrinks.map((item, index) => (
                                    <View key={index} className="ml-2 mb-2 flex-row justify-between items-center">
                                        <Text className="text-white">{item.name} x{item.quantity}</Text>
                                        <Text className="text-white">${(item.cost * item.quantity).toFixed(2)}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        <View className="w-10/12 mt-4 border-t border-neutral-400"></View>

                        {/* Total Price */}
                        <View className="w-10/12 mt-4 flex-row justify-between items-center">
                            <Text className="text-white text-base mb-1">Total :</Text>
                            <Text className="text-white text-xl">${totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>
                )}

                {/* nut them bap nc & thanh toan */}
                {isSelectionComplete && isNextClicked && (
                    <View ref={ticketsRef} className="mt-8 px-10 items-center space-y-4">
                        <TouchableOpacity
                            className="w-full rounded-lg py-3 items-center bg-customGray"
                            onPress={toggleModal}
                        >
                            <Text>{foodAndDrinks.length > 0 ? "Edit food & drinks" : "Add food & drinks"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="w-full rounded-lg py-3 items-center bg-customPink"
                        >
                            <Text className="text-white">Pay</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {isAboveChairs && isSelectionComplete && (
                <View className="absolute w-full z-10 bottom-4 items-center">
                    <TouchableOpacity
                        className="w-10/12 rounded-lg py-3 items-center bg-customPink"
                        onPress={() => {
                            setIsNextClicked(true);
                            setCanScrollBeyondChairs(true); // Cho phép cuộn vượt quá phần ghế
                            setTimeout(() => {
                                scrollToTickets(); // Cuộn xuống phần "Your Tickets"
                            }, 200); // Thêm thời gian chờ nếu cần để ScrollView cập nhật
                        }}
                    >
                        <Text className="text-white">Next</Text>
                    </TouchableOpacity>
                </View>
            )}

        </LinearGradient >
    )
}
