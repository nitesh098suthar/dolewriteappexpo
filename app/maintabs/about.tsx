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
            source={require("@/assets/images/banners/about-box.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="About Box"
          />
        </View>

        <View>
          <Text className="text-2xl font-extrabold mt-10">About Us</Text>
          <Text className="text-lg mt-4">
            Dolewrite began with a simple idea: learning should be as fun as
            playtime! We are a team of educators, designers and dreamers who
            believe kids learn best when they are excited. That is why we built
            an e-learning app packed with interactive courses-all designed to
            make kids smile while they grow.
          </Text>
          <Image
            source={require("@/assets/images/about/about-main.png")}
            className="w-full rounded-2xl"
            resizeMode="contain"
            alt="About Dolewrite"
          />
        </View>

        <View>
          <Text className="text-2xl font-extrabold">Our Mission</Text>
          <Text className="text-lg mt-4">
            At Dolewrite, we are on a mission to make learning a blast for kids.
            We believe every child is a star and our job is to help them shine
            brighter with fun, interactive courses they can explore at their own
            pace. From classrooms to living rooms, we are here to bring
            education and imagination together!
          </Text>
        </View>

        <View className="mt-14">
          <Text className="text-2xl font-extrabold">
            Why Choose Dolewrite?
          </Text>
          <View className="mt-6">
            <Text className="text-lg mb-2">
              <Text className="font-semibold">1</Text>•{" "}
              <Text className="font-semibold">
                Interactive Learning:{" "}
              </Text>{" "}
              Engaging courses with animations & fun activities.
            </Text>
            <Text className="text-lg mb-2">
              <Text className="font-semibold">2</Text>•{" "}
              <Text className="font-semibold">Expert-Crafted Content: </Text>{" "}
              Designed by educators for young minds.
            </Text>
            <Text className="text-lg mb-2">
              <Text className="font-semibold">3</Text>•{" "}
              <Text className="font-semibold">Seamless Access: </Text> Learn anytime, anywhere, on any device.
            </Text>
            <Text className="text-lg mb-10">
              <Text className="font-semibold">4</Text>•{" "}
              <Text className="font-semibold">Safe & Kid-Friendly: </Text> A secure learning space for children.
            </Text>
          </View>
        </View>

        <Accordions />
      </ScrollView>
    </View>
  );
};

export default About;
