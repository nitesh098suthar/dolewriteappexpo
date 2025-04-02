import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Accordions from "@/components/accordians";

const About = () => {
  const [textWidth, setTextWidth] = useState(0);

  return (
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="z-0 absolute w-full"
        resizeMode="cover"
        alt="background line image"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mt-20 h-56"
          style={{ borderRadius: 20, overflow: "hidden" }}
        >
          <LinearGradient
            colors={["#750900", "#FA6D27"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="rounded-2xl p-6 h-full"
          >
            <Image
              source={require("@/assets/images/about-bubble.png")}
              className="absolute -top-14 -right-1 w-56 h-56"
              resizeMode="contain"
            />

            <Text
              className="text-white text-xl font-extrabold"
              onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
            >
              Welcome to Dolewrite – Making Learning Fun and Engaging!
            </Text>

            <Text className="text-white text-lg mt-6 w-4/5">
              We are here to revolutionize kids’ education by blending
              technology with creativity.
            </Text>

            {/* Bottom Left Bubble */}
            <Image
              source={require("@/assets/images/about-bubble2.png")}
              className="absolute -bottom-4 -left-3 w-40 h-40"
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        <View className="mt-10">
          <Text className="text-3xl font-extrabold">About Us</Text>
          <Text className="text-xl font-semibold mt-3">
            Want to know more about us? Here we've provided more details about
            us.
          </Text>
          <Text className="text-xl mt-3">
            Dolewrite began with a simple idea: learning should be as fun as
            playtime! We're a team of educators, designers, and dreamers who
            believe kids learn best when they're excited. That's why we built an
            e-learning app packed with interactive courses.
          </Text>
          <Image
            source={require("@/assets/images/about-main.png")}
            className="w-full h-64 mt-6 rounded-2xl"
            resizeMode="cover"
            alt="About Dolewrite"
          />
        </View>

        <View className="mt-10">
          <Text className="text-3xl font-extrabold">Our Mission</Text>
          <Text className="text-xl mt-3">
            At Dolewrite, we’re on a mission to make learning a blast for kids
            aged 4-12. We believe every child is a star, and our job is to help
            them shine brighter with fun, interactive courses.
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-3xl font-extrabold">
            Why Kids Love Dolewrite?
          </Text>
          <View className="mt-3">
            <Text className="text-xl mb-2">
              <Text className="font-bold">1</Text>•{" "}
              <Text className="font-bold">
                Interactive Learning Adventures :{" "}
              </Text>{" "}
              Our lessons are designed as exciting quests where every new
              concept is a discovery waiting to happen.
            </Text>
            <Text className="text-xl mb-2">
              <Text className="font-bold">2</Text>•{" "}
              <Text className="font-bold">Personalized Learning Paths : </Text>{" "}
              Each child progresses at their own pace, with content that adapts
              to their unique learning style and interests.
            </Text>
            <Text className="text-xl mb-2">
              <Text className="font-bold">3</Text>•{" "}
              <Text className="font-bold">Rewards and Recognition : </Text> Kids
              earn badges, points, and special achievements as they master new
              skills.
            </Text>
          </View>
        </View>

        <Accordions />
      </ScrollView>
    </View>
  );
};

export default About;
