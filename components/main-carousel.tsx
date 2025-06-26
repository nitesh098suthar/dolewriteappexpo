import React from "react";
import { View, Text, Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function MyCarousel({data}:any) {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Carousel
        width={width - 20}
        height={240}
        autoPlay
        data={data}
        scrollAnimationDuration={2000}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderRadius: 0,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 8,
              //   backgroundColor : "red"
            }}
          >
            <View
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                overflow: "hidden",
              }}
            >
              <Image
                source={data[index]}
                resizeMode="stretch"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
