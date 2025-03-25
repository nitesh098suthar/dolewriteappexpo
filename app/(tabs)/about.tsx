import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import Accordions from "@/components/accordians";

const About = () => {
  return (
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="z-0 absolute w-full"
        resizeMode="cover"
        alt="backgound line image"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        className="flex-1 px-5"
      >
        <View className="mt-10">
          <Text className="text-4xl font-extrabold mt-14 ">About Us</Text>
          <Text className="text-xl font-semibold mt-3">
            Want to know more about us? Here we've provided more details about
            us.
          </Text>
          <Text className="text-xl mt-3">
            Dolewrite began with a simple idea: learning should be as fun as
            playtime! We’re a team of educators, designers, and dreamers who
            believe kids learn best when they’re excited. That’s why we built an
            e-learning app packed with interactive courses. Math puzzles, story
            adventures, and science experiments, all designed to make kids smile
            while they grow.
          </Text>
        </View>
        <Accordions />
      </ScrollView>
    </View>
  );
};

export default About;
