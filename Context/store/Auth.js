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

  useEffect(() => {
    setShowChild(true);

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
