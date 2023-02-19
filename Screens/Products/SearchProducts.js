import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Body, Content, Left, List, ListItem, Thumbnail } from "native-base";
import React from "react";

var { width } = Dimensions.get("window");

const SearchProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <ListItem
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
            key={item._id.$oid}
            avatar
          >
            <Left>
              <Thumbnail
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/02/17/46/package-25067_1280.png",
                }}
              />
            </Left>
            <Body>
              <Text>{item.name}</Text>
              <Text note>{item.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View>
          <Text>No products Match the selected criteria</Text>
        </View>
      )}
    </Content>
  );
};

export default SearchProducts;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
