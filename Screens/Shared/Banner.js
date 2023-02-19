import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper/src";
import React, { useEffect, useState } from "react";
var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData([
      "https://cdn.pixabay.com/photo/2014/08/05/10/30/iphone-410324_1280.jpg",
      "https://cdn.pixabay.com/photo/2014/04/05/09/30/tablet-314153_1280.png",
      "https://cdn.pixabay.com/photo/2014/04/05/09/30/tablet-314153_1280.png",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
