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

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const confirmOrder = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };
  const confirm = props.route.params;
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
              <Text>Address: {confirm.order.order.shippingAdrress1}</Text>
              <Text>Address2: {confirm.order.order.shippingAdrress2}</Text>
              <Text>City: {confirm.order.order.city}</Text>
              <Text>Zip Code: {confirm.order.order.zip}</Text>
              <Text>country: {confirm.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {confirm.order.order.orderItems.map((x) => {
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
