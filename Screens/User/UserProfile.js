import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

import axios from "axios";
import { Container } from "native-base";
import { logoutUser } from "../../Context/actions/Auth.action";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import OrderCart from "../Shared/Form/OrderCart";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  useFocusEffect(
    useCallback(() => {
      //console.log("userPoriles log => ", context.stateUser.user);
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data));
        })
        .catch((error) => console.log(error));
      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data;
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.userId
          );
          setOrders(userOrders);
        })
        .catch((error) => console.log(error));

      return () => {
        setUserProfile();
        setOrders();
      };
    }, [context.stateUser.user.userId])
  );

  return (
    <Container style={styles.Container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ""}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => {
              AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
          />
        </View>
        <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCart key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You Have No Orders</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    margin: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});
