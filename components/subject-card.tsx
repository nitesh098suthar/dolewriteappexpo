import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const SubjectCard = () => {
  return (
    <View className="mt-10">
      <Text className="text-black text-2xl font-bold">Your Courses</Text>

      <View
        className="mt-4 w-[332px] h-[180px] shadow-lg"
        style={{ borderRadius: 24 }}
      >
        <LinearGradient
          colors={["#F8AD30", "#F97316"]}
          locations={[0.1, 0.7]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="p-6 relative items-center w-full h-full"
          style={{ borderRadius: 22 }}
        >
          <Image
            source={require("@/assets/images/card-eng.png")}
            className="absolute top-[-40%] left-44 transform -translate-x-1/2 w-40 h-40"
            resizeMode="contain"
          />

          <Text className="text-white text-2xl font-bold mt-20">
            Capital Letters (Alphabet)
          </Text>

          <View className="flex-row items-center justify-between w-full mt-2 px-12">
            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/card-book.png")}
                className="w-4 h-4"
                resizeMode="contain"
              />
              <Text className="text-white text-sm ml-2 mr-4">05</Text>
            </View>

            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/card-clock.png")}
                className="w-4 h-4"
                resizeMode="contain"
              />
              <Text className="text-white text-sm ml-2 mr-4">11h 20m</Text>
            </View>

            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/card-star.png")}
                className="w-4 h-4"
                resizeMode="contain"
              />
              <Text className="text-white text-sm ml-2">(4.8 Reviews)</Text>
            </View>
          </View>

          <Image
            source={require("@/assets/images/card-cross.png")}
            className="absolute top-2 right-6 w-20 h-20"
            resizeMode="contain"
          />

          <Image
            source={require("@/assets/images/profile-spiral.png")}
            className="absolute top-2 left-14 w-8 h-8"
            resizeMode="contain"
          />

          <Image
            source={require("@/assets/images/card-curly.png")}
            className="absolute top-6 left-2 w-20 h-20"
            resizeMode="contain"
          />

          <Image
            source={require("@/assets/images/profile-small.png")}
            className="absolute top-24 left-2 w-10 h-10"
            resizeMode="contain"
          />

          <Image
            source={require("@/assets/images/profile-small.png")}
            className="absolute bottom-3 right-2 w-8 h-8"
            resizeMode="contain"
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default SubjectCard;
