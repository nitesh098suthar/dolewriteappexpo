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
            playtime! We're a team of educators, designers, and dreamers who
            believe kids learn best when they're excited. That's why we built an
            e-learning app packed with interactive courses. Math puzzles, story
            adventures, and science experiments, all designed to make kids smile
            while they grow.
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
            them shine brighter with fun, interactive courses they can explore
            at their own pace. From classrooms to living rooms, we’re here to
            bring education and imagination together!
          </Text>
        </View>

        <View className="mt-10">
          <Text className="text-3xl font-extrabold">
            Why Kids Love Dolewrite ?
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
              skills, keeping them motivated and engaged.
            </Text>
          </View>
        </View>

        <Accordions />
      </ScrollView>
    </View>
  );
};

export default About;
