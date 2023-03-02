import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
// stack
import HomeNavigtor from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import CartIcon from "../Screens/Shared/CartIcon";
import UserNavigtor from "./UseNavigator";
import AdminNavigtor from "./adminNavigator";
import AuthGlobal from "../Context/store/AuthGlobal";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigtor}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name="shopping-cart" color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigtor}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigtor}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
