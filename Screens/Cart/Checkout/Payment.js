import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  ListItem,
  Picker,
  Radio,
  Right,
  Title,
} from "native-base";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Campus Pay", value: 2 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  const payment = () => {
    if (!selected) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Pls Select A Payment Method",
        text2: "",
      });
      return;
    }
    props.navigation.navigate("Confirm", { order });
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>Payment Method</Title>
        </Body>
      </Header>
      {order ? (
        <Content>
          {methods.map((item, index) => {
            return (
              <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                <Left>
                  <Text>{item.name}</Text>
                </Left>
                <Right>
                  <Radio selected={selected == item.value} />
                </Right>
              </ListItem>
            );
          })}

          <View style={{ marginTop: 60, alignSelf: "center" }}>
            <EasyButton large primary onPress={() => payment()}>
              <Text style={styles.buttonText}>Continue</Text>
            </EasyButton>
          </View>
        </Content>
      ) : null}
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
  },
});
