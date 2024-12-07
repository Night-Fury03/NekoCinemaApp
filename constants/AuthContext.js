import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const checkLoginStatus = async () => {
      let storedStatus = await AsyncStorage.getItem('isLoggedIn');
      if (storedStatus !== null) {
        storedStatus = await AsyncStorage.getItem('isLoggedIn');
      } else {
        storedStatus = await AsyncStorage.setItem('isLoggedIn', 'false');
      }
      
      setIsLoggedIn(storedStatus === 'true'); // Chuyển trạng thái từ AsyncStorage sang boolean
      setLoading(false); // Ngừng trạng thái loading
    };

    checkLoginStatus();
  }, []);

  // Hàm xử lý đăng nhập
  const login = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // Hàm xử lý đăng xuất
  const logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
