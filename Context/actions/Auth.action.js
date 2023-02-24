import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

// login
export const loginUser = (user, dispatch) => {
  fetch(`${baseURL}users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;

        AsyncStorage.setItem("jwt", token);

        // const storeData = async (value) => {
        //   try {
        //     await AsyncStorage.setItem("jwt", value);
        //   } catch (e) {
        //     // saving error
        //   }
        // };

        // storeData(token);
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded, user));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: "",
      });
      logoutUser(dispatch);
    });
};

// user profile
export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// logout
export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};
// setCurrentUser function
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    playload: decoded,
    userProfile: user,
  };
};
