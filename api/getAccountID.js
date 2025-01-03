import axios from "axios";
import { apiKey, apiBaseUrl } from "../constants";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getRequestToken = async () => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/authentication/token/new?api_key=${apiKey}`
    );
    return response.data.request_token;
  } catch (error) {
    console.log("Error creating request token:", error);
  }
};

const createSession = async (requestToken) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}/authentication/session/new?api_key=${apiKey}`,
      {
        request_token: requestToken,
      }
    );
    return response.data.session_id;
  } catch (error) {
    console.log("Error creating session:", error);
  }
};

const getAccountDetails = async (sessionId) => {
  try {
    const response = await axios.get(
      `${apiBaseUrl}/account?api_key=${apiKey}&session_id=${sessionId}`
    );
    return response.data.id;
  } catch (error) {
    console.log("Error getting account details:", error);
  }
};

const verifyAccount = async (requestToken, setAccountID) => {
  try {
    // Bước 4: Tạo session từ request token đã được xác thực
    const sessionId = await createSession(requestToken);
    await AsyncStorage.setItem("sessionID", sessionId);
    console.log("Session ID:", sessionId);

    const accountId = await getAccountDetails(sessionId);
    await AsyncStorage.setItem("accountID", JSON.stringify(accountId));
    console.log("Account ID:", accountId);
    setAccountID(accountId);
    return accountId ? true : false;
  } catch (error) {
    console.error("Error verifying account:", error);
    return false;
  }
};

export const getAccountID = async (setAccountID) => {
  try {
    const requestToken = await getRequestToken();
    console.log("Request Token:", requestToken);
    const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
    Linking.openURL(authUrl).catch((err) => {
      console.error("Error opening URL:", err);
    });
    const interval = setInterval(async () => {
      const isVerified = await verifyAccount(
        requestToken,
        setAccountID,
      );
      if (isVerified) {
        alert("Xác minh tài khoản thành công!");
      } else {
        alert("Xác minh tài khoản thất bại!");
      }
      clearInterval(interval);
    }, 5000);
  } catch (error) {
    console.error("Error during account verification:", error);
  }
};
