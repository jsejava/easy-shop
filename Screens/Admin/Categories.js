import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import EasyButton from "../Shared/StyledComponents/EasyButton";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { FlatList } from "react-native-gesture-handler";
var { height, width } = Dimensions.get("window");

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>{props.item.name}</Text>
      <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Detele</Text>
      </EasyButton>
    </View>
  );
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("error to load cathegories"));
    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    if (!categoryName) {
      alert("Categories Must not be Empty");
      return;
    }
    const category = {
      name: categoryName,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}categories`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => {
        alert("Error to load categories");
        console.log(error);
      });

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item._id !== id);

        setCategories(newCategories);
      })
      .catch((error) => {
        alert("Error to load categorpes");
        console.log(error);
      });
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        {categories && (
          <FlatList
            data={categories}
            renderItem={({ item, index }) => (
              <Item item={item} index={index} delete={deleteCategory} />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text>Add Category</Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <EasyButton medium primary onPress={() => addCategory()}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});
