import { ScrollView, StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";

import axios from "axios";
import { Container } from "native-base";
import { logoutUser } from "../../Context/actions/Auth.action";
import AuthGlobal from "../../Context/store/AuthGlobal";

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  useEffect(() => {
    console.log("context =>  ", context);
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Login");
    }
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}users/63f46da878534c66563ca3c8`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  return (
    <Container>
      <ScrollView>
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
      </ScrollView>
    </Container>
  );
};

export default UserProfile;

const styles = StyleSheet.create({});
