import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useReducer, useState } from "react";
import authReducer from "../reducers/Auth.reducer";
import jwt_decode from "jwt-decode";
import AuthGlobal from "./AuthGlobal";
import { setCurrentUser } from "../actions/Auth.action";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("jwt");

      if (value !== null) {
        if (value) {
          const decoded = value ? value : "";
          //console.log("setShowChild", showChild);
          if (showChild) {
            dispatch(setCurrentUser(jwt_decode(decoded)));
          }
        }
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setShowChild(true);
    //getData();

    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";

      if (setShowChild) {
        dispatch(setCurrentUser(jwt_decode(decoded)));
      }
    }

    return () => {
      setShowChild(false);
    };
  }, []);
  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};
export default Auth;
