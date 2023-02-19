import { StyleSheet, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// Redux

// Navigators
import Main from "./navigators/Main";
// Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Screens/Shared/Header";
import { Provider } from "react-redux";
import store from "./Redux/store";

//LogBox.ignoreLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
