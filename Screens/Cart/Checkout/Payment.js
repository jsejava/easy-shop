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

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];
const PaymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "Other", value: 3 },
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  return (
    <Container>
      <Header>
        <Body>
          <Title>Choose your payment method</Title>
        </Body>
      </Header>
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
        {selected == 3 ? (
          <Picker
            mode="dropdown"
            iosIcon={<Icon name={"arrow-down"} />}
            headerStyle={{ backgroundColor: "orange" }}
            headerBackButtonTextStyle={{ color: "#fff" }}
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {PaymentCards.map((c, index) => {
              return (
                <Picker.Item key={c.name} label={c.name} value={c.value} />
              );
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirn"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Payment;

const styles = StyleSheet.create({});
