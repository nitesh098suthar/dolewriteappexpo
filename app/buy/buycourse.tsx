import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

const BuyCourse = () => {
  const [textWidth, setTextWidth] = useState(0);

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />

      <View
        style={{
          borderRadius: 20, 
          overflow: "hidden",
        }}
        className="absolute top-10 left-5 right-5"
      >
        <LinearGradient
          colors={["#750900", "#FA6D27"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{
            borderRadius: 20,
            padding: 24,
            position: "relative",
          }}
        >
          <Image
            source={require("@/assets/images/buy-lock.png")}
            className="absolute top-8 right-3 w-32 h-32"
            resizeMode="contain"
          />

          <Text
            className="text-white text-xl font-extrabold text-left"
            onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
          >
            Explore Our More Courses
          </Text>

          <Image
            source={require("@/assets/images/buy-curve.png")}
            style={{
              width: 50, 
              height: 50, 
              position: "absolute",
              top: 28, 
              left: textWidth - 120, 
            }}
            resizeMode="contain"
          />

          <Text className="text-white text-md mt-6 text-left w-4/6">
            Unlock your learning journey! Purchase courses on our website and
            access them here with your login credentials.
          </Text>

          <TouchableOpacity className="bg-[#0F172A] px-6 py-3 rounded-lg mt-4 w-36">
            <Text className="text-white text-md font-semibold text-center">
              Purchase Now
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <ScrollView
        className="flex-1 px-5 mt-44"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
      </ScrollView>
    </View>
  );
};

export default BuyCourse;
