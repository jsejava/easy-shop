import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import OrderCart from "../Shared/Form/OrderCart";
import baseURL from "../../assets/common/baseUrl";

const Orders = (props) => {
  const [ordersList, setOrdersList] = useState();
  useFocusEffect(
    useCallback(() => {
      getOrders();
      return () => {
        setOrdersList();
      };
    }, [])
  );
  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => {
        setOrdersList(x.data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <View>
      <FlatList
        data={ordersList}
        renderItem={({ item }) => (
          <OrderCart navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({});
