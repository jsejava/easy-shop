import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import * as action from "../../../Redux/Actions/cartActions";
import { Body, Left, ListItem, Right, Thumbnail } from "native-base";
import { connect } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import baseURL from "../../../assets/common/baseUrl";
import axios from "axios";

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const finalOrder = props.route.params;
    const order = finalOrder.order.order;

    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirn order</Text>
        {props.route.params ? (
          <View
            style={{
              borderWidth: 1,
              borderColor: "orange",
            }}
          >
            <Text style={styles.title}>Shipping To:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address: {finalOrder.order.order.shippingAdrress1}</Text>
              <Text>Address2: {finalOrder.order.order.shippingAdrress2}</Text>
              <Text>City: {finalOrder.order.order.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.zip}</Text>
              <Text>country: {finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {finalOrder.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.ListItem} key={x.product.name} avatar>
                  <Left>
                    <Thumbnail source={{ uri: x.product.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{x.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>$ {x.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View>
          <Button title="Place order" onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(action.clearCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  ListItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignContent: "center",
    flexDirection: "row",
  },
});
