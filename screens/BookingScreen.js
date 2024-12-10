import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";
import { time, day, chair, FoodDrink } from "../index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingScreen() {
  const { params } = useRoute();
  const { item, detailsMovie } = params;
  const navigation = useNavigation();

  const scrollViewRef = useRef(null);
  const ticketsRef = useRef(null);
  const yourTicketsRef = useRef(null);
  const nextRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-50)).current;

  const [nextOffset, setNextOffset] = useState(null);

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedChairs, setSelectedChairs] = useState([]);

  const [maxChairInRow, setMaxChairInRow] = useState(0);
  const [chairInRow, setChairInRow] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility
  const [foodAndDrinks, setFoodAndDrinks] = useState([]); // Food & drinks list

  const [tempSelection, setTempSelection] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isAboveChairs, setIsAboveChairs] = useState(true); // Theo dõi vị trí cuộn

  const isSelectionComplete =
    selectedDay !== null && selectedTime !== null && selectedChairs.length > 0;
  const [asyncChair, setAsyncChair] = useState([]);
  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Add or Edit selection
  const handleSave = () => {
    setFoodAndDrinks(tempSelection);
    setModalVisible(false);
  };

  useEffect(() => {
    const chairTotal = selectedChairs.length * 2; // Giá mỗi ghế
    const foodTotal = foodAndDrinks.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );

    setTotalPrice(chairTotal + foodTotal);
  }, [selectedChairs, foodAndDrinks]);

  const findMaxCountChairInRow = (item) => {
    const count = item.position.length;
    if (count > maxChairInRow) {
      setMaxChairInRow(count);
    }
  };

  useEffect(() => {
    const rowArray = (count) => {
      const res = Array.from({ length: count }, (_, index) => index + 1);
      setChairInRow(res);
      return res;
    };
    rowArray(maxChairInRow);
  }, []);

  useEffect(() => {
    const saveChairPosition = async () => {
      if (!(await AsyncStorage.getItem("chairs"))) {
        await AsyncStorage.setItem("chairs", JSON.stringify(chair));
      }
      setAsyncChair(JSON.parse(await AsyncStorage.getItem("chairs")));
    };

    saveChairPosition();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: isAboveChairs ? 1 : 0, // Hiện (1) hoặc Ẩn (0)
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: isAboveChairs ? 0 : -50, // Vị trí: Ban đầu (0) hoặc Đẩy xuống (50px)
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isAboveChairs]);

  const handleScroll = (event) => {
    const yOffset = event.nativeEvent.contentOffset.y;

    if (nextRef.current) {
      nextRef.current.measureInWindow((xNext, yNext, width, height) => {
        setNextOffset(yNext);
      });
    }

    if (yourTicketsRef.current) {
      yourTicketsRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          // Kiểm tra nếu vị trí hiện tại nằm trên hoặc dưới phần ghế
          if (y - yOffset > nextOffset && nextOffset && !isAboveChairs) {
            setIsAboveChairs(true); // Hiển thị nút Next
          } else if (y - yOffset <= nextOffset && nextOffset && isAboveChairs) {
            setIsAboveChairs(false); // Ẩn nút Next
          }
        },
        () => {
          console.error("Failed to measure layout for yourTicketsRef");
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
    <View className="flex-1 bg-customLinearGradient1">
      <View className="absolute z-10 my-8">
        <TouchableOpacity
          className="px-4 top-1"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={30} strokeWidth={1} color="#e9e9e9" />
        </TouchableOpacity>
      </View>
      <View className="w-full my-8 items-center justify-center">
        <Text className="text-white text-3xl">
          {detailsMovie.original_title.length > 14
            ? detailsMovie.original_title.slice(0, 14) + "..."
            : detailsMovie.original_title}
        </Text>
      </View>

      {isAboveChairs && isSelectionComplete && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }}
          ref={nextRef}
          className="absolute w-full z-10 bottom-4 items-center"
        >
          <TouchableOpacity
            className="w-10/12 rounded-lg py-3 items-center bg-customPink"
            onPress={() => {
              setIsNextClicked(true);
              setTimeout(() => {
                scrollToTickets(); // Cuộn xuống phần "Your Tickets"
              }, 200); // Thêm thời gian chờ nếu cần để ScrollView cập nhật
            }}
          >
            <Text className="text-white">Next</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView
        ref={scrollViewRef}
        vertical
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "left",
          paddingBottom: 90,
        }}
        onScroll={handleScroll} // Theo dõi cuộn
        scrollEventThrottle={16} // Tăng độ nhạy của sự kiện cuộn
      >
        {/* chọn ngày chiếu */}
        <View className="w-full flex-row">
          <View className="mr-4 px-3 h-14 bg-customGray rounded-r-2xl justify-center">
            <Text className="text-lg">DEC</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {day.map((item, index) => {
              const isSelected = selectedDay.id === item.id;
              return (
                <TouchableOpacity
                  key={index}
                  className={`w-16 mr-4 px-3 rounded-2xl justify-center items-center ${
                    isSelected ? "bg-customYellow" : "bg-white"
                  }`}
                  onPress={() => setSelectedDay(item)}
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
            const isSelected = selectedTime === item.time;
            return (
              <TouchableOpacity
                key={index}
                className={`w-20 mr-4 mb-4 p-3 rounded-lg justify-center items-center ${
                  isSelected ? "bg-customYellow" : "border border-neutral-400"
                }`}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text className={`${isSelected ? "" : "text-white"}`}>
                  {item.time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Màn hình */}
        <View className="relative mt-8 items-center justify-center">
          <View
            style={{
              height: 70,
              transform: [{ perspective: 150 }, { rotateX: "-15deg" }],
            }}
            className="w-10/12 bg-customPink border border-neutral-400"
          ></View>
          <Text className="absolute text-white text-lg font-extrabold">
            SCREEN
          </Text>
        </View>

        {/* lựa chọn ghế */}
        <View className="w-full mt-4 flex-row">
          <View className="w-1/12 justify-between">
            {chair.map((item, index) => {
              return (
                <View
                  key={index}
                  className="border border-transparent my-1 w-6 h-6"
                >
                  <Text className="text-white text-center" key={index}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>

          <View className="flex-1 justify-center items-center">
            {!asyncChair
              ? ""
              : asyncChair.map((row, rowIndex) => {
                  findMaxCountChairInRow(row);
                  return (
                    <View
                      key={rowIndex}
                      className="flex-row justify-center items-center"
                    >
                      {row.position.map((position, index) => {
                        const isOrdered = position.ordered; // Kiểm tra nếu ghế đã được đặt
                        return (
                          <TouchableOpacity
                            key={index}
                            className={`m-1 w-6 h-6 rounded-lg 
                                                            ${
                                                              selectedChairs.includes(
                                                                position.name
                                                              )
                                                                ? "bg-customYellow"
                                                                : "border border-neutral-400"
                                                            }
                                                            ${
                                                              isOrdered
                                                                ? "bg-customGray"
                                                                : ""
                                                            }
                                                        `}
                            disabled={isOrdered} // Vô hiệu hóa nút nếu ghế đã được đặt
                            onPress={() => {
                              setSelectedChairs(
                                (prev) =>
                                  prev.includes(position.name)
                                    ? prev.filter(
                                        (chair) => chair !== position.name
                                      ) // Bỏ ghế nếu đã chọn
                                    : [...prev, position.name] // Thêm ghế nếu chưa chọn
                              );
                            }}
                          />
                        );
                      })}
                    </View>
                  );
                })}
          </View>
        </View>

        <View className="w-full flex-row justify-end mt-1">
          <View className="w-11/12 flex-row justify-center items-center ">
            {chairInRow.map((item, index) => {
              return (
                <View
                  key={index}
                  className="border border-transparent mx-1 w-6 h-6"
                >
                  <Text className="text-white text-center" key={index}>
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View className="mx-8 mt-8 flex-row justify-between items-center">
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
          <View
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <View className="w-10/12 p-5 bg-white rounded-lg items-center">
              <Text className="mb-5 text-lg font-bold">Choose your items</Text>

              {/* Example food and drink options */}
              <View className="w-full">
                {FoodDrink.map((item) => {
                  // Check if item already exists in tempSelection
                  const selectedItem = tempSelection.find(
                    (f) => f.id === item.id
                  );
                  const quantity = selectedItem ? selectedItem.quantity : 0;

                  return (
                    <View
                      key={item.id}
                      className="flex-row justify-between items-center mb-2"
                    >
                      <Text className="text-base">{item.name}</Text>

                      {/* Quantity Controls */}
                      <View className="flex-row items-center">
                        {/* Decrease Button */}
                        <TouchableOpacity
                          className="px-4 rounded border border-neutral-400"
                          onPress={() => {
                            setTempSelection((prev) => {
                              const existing = prev.find(
                                (f) => f.id === item.id
                              );
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
                        <Text className="text-center text-base px-2 w-10">
                          {quantity}
                        </Text>

                        {/* Increase Button */}
                        <TouchableOpacity
                          className="px-4 rounded bg-customYellow"
                          onPress={() => {
                            const existing = tempSelection.find(
                              (f) => f.id === item.id
                            );
                            if (existing) {
                              setTempSelection((prev) =>
                                prev.map((f) =>
                                  f.id === item.id
                                    ? { ...f, quantity: f.quantity + 1 }
                                    : f
                                )
                              );
                            } else {
                              setTempSelection((prev) => [
                                ...prev,
                                { ...item, quantity: 1 },
                              ]);
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
              <TouchableOpacity
                className="w-6/12 mt-5 py-2  rounded-lg bg-customOrange items-center"
                onPress={handleSave}
              >
                <Text className="text-white text-base">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Thông tin vé */}
        {isSelectionComplete && isNextClicked && (
          <View ref={yourTicketsRef} className="mt-8 items-center">
            <View className="w-full ml-8">
              <Text className="text-customOrange text-xl">Your tickets</Text>
            </View>

            {/* Selected Seats */}
            {selectedChairs.length > 0 && (
              <View className="w-10/12 mt-4">
                <Text className="text-white text-lg mb-1 font-bold">
                  Selected Seats
                </Text>
                <View className="w-full flex-row justify-between">
                  <View className="w-8/12 ml-2 flex-row flex-wrap">
                    {selectedChairs.map((chair, index) => (
                      <Text key={index} className="text-white mr-2">
                        {chair}
                      </Text>
                    ))}
                  </View>
                  <Text className="text-white text-right flex-1">
                    ${(selectedChairs.length * 2).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}

            {foodAndDrinks.length > 0 && (
              <View className="w-10/12 mt-4">
                <Text className="text-white text-lg mb-1 font-bold">
                  Foods & Drinks
                </Text>
                {foodAndDrinks.map((item, index) => (
                  <View
                    key={index}
                    className="ml-2 mb-2 flex-row justify-between items-center"
                  >
                    <Text className="text-white">
                      {item.name} x{item.quantity}
                    </Text>
                    <Text className="text-white">
                      ${(item.cost * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View className="w-10/12 mt-4 border-t border-neutral-400"></View>

            {/* Total Price */}
            <View className="w-10/12 mt-4 flex-row justify-between items-center">
              <Text className="text-white text-lg font-bold mb-1">Total :</Text>
              <Text className="text-white text-lg font-bold">
                ${totalPrice.toFixed(2)}
              </Text>
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
              <Text>
                {foodAndDrinks.length > 0
                  ? "Edit food & drinks"
                  : "Add food & drinks"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-full rounded-lg py-3 items-center bg-customPink"
              onPress={() =>
                navigation.navigate("Pay", {
                  movie: item,
                  detailsMovie: detailsMovie,
                  selectedDay,
                  selectedTime,
                  selectedChairs,
                  foodAndDrinks,
                  totalPrice,
                })
              }
            >
              <Text className="text-white">Pay</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
