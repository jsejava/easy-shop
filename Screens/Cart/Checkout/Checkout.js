import { Button, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../Shared/Form/FormContainer";
import { Icon, Item, Picker } from "native-base";
import { connect } from "react-redux";
import Input from "../../../Screens/Shared/Form/Input";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
const hostels = require("../../../assets/data/hostels.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [hostel, setHostel] = useState();
  const [room, setRoom] = useState();

  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      // Toast.show({
      //   topOffset: 60,
      //   type: "error",
      //   text1: "Please Login to Checkout",
      //   text2: "",
      // });
    }
    return () => {
      setOrderItems();
    };
  }, [context.stateUser.isAuthenticated]);
  const chechOut = () => {
    if (!hostel) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pls Select Your Hostel",
        text2: "",
      });
      return;
    }
    if (!room) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pls Select Your Room Nber",
        text2: "",
      });
      return;
    }
    let order = {
      dateOrdered: Date.now(),
      orderItems,
      hostel: hostel,
      room: room,
      status: "3",
      user,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Address"}>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            //style={{ width: undefined,  }}
            style={styles.picker}
            selectedValue={hostel}
            placeholder="Select your hostel"
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setHostel(e)}
          >
            {hostels.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>

        <Input
          placeholder={"Room Nber"}
          name={"room"}
          value={room}
          onChangeText={(text) => setRoom(text)}
        />
        <View style={{ width: "80%", alignItems: "center" }}>
          <EasyButton large primary onPress={() => chechOut()}>
            <Text style={styles.buttonText}>Continue</Text>
          </EasyButton>
          {/* <Button title="Continue" onPress={() => chechOut()} /> */}
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

const styles = StyleSheet.create({
  picker: {
    width: 310,
    height: 60,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: "orange",
  },
});
