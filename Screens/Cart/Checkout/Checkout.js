import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../Shared/Form/FormContainer";
import { Icon, Item, Picker } from "native-base";
import { connect } from "react-redux";
import Input from "../../../Screens/Shared/Form/Input";
import * as Font from "expo-font";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const countries = require("../../../assets/data/countries");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);
    //console.log(context.stateUser.user);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text2: "",
      });
    }
    return () => {
      setOrderItems();
    };
  }, []);
  const chechOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAdrress1: address,
      shippingAdrress2: address2,
      status: "3",
      user,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
    //props.navigation.setOptions({ order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress 1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress 2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: undefined }}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => chechOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);

const styles = StyleSheet.create({});
