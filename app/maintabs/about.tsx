import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import Accordions from "@/components/accordians";

const About = () => {
  return (
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
        alt="background line image"
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        className="flex-1 px-5 mt-16"
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/about-box.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="About Box"
          />
        </View>

        <View>
          <Text className="text-2xl font-extrabold mt-8">About Us</Text>
          <Text className="text-xl font-semibold mt-3">
            Want to know more about us? Here we've provided more details about
            us.
          </Text>
          <Text className="text-lg mt-3">
            Dolewrite began with a simple idea: learning should be as fun as
            playtime! We're a team of educators, designers, and dreamers who
            believe kids learn best when they're excited. That's why we built an
            e-learning app packed with interactive courses.
          </Text>
          <Image
            source={require("@/assets/images/about-main.png")}
            className="w-full rounded-2xl"
            resizeMode="contain"
            alt="About Dolewrite"
          />
        </View>

        <View>
          <Text className="text-2xl font-extrabold">Our Mission</Text>
          <Text className="text-lg mt-3">
            At Dolewrite, we’re on a mission to make learning a blast for kids
            aged 4-12. We believe every child is a star, and our job is to help
            them shine brighter with fun, interactive courses.
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-2xl font-extrabold">
            Why Kids Love Dolewrite?
          </Text>
          <View className="mt-3">
            <Text className="text-lg mb-2">
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
            <Text className="text-xl mb-10">
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
