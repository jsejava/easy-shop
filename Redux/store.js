import { StyleSheet, Text, View } from "react-native";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import cartItems from "./Reducers/cartItem";

const reducers = combineReducers({
  cartItems: cartItems,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;

const styles = StyleSheet.create({});
