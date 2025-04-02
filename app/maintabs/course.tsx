import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CourseList from "@/components/course-list";

const Course = () => {
  return (
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="z-0 absolute w-full"
        resizeMode="cover"
        alt="background line image"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        className="flex-1 px-5"
      >
        {/* Gradient Box for Course Heading */}
        <View
          className="mt-20 mb-8 h-56"
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
            <Text className="text-3xl font-extrabold text-white">
              Available Courses
            </Text>
            <Text className="text-lg font-semibold mt-3 text-white">
              We've multiple other courses you can purchase according to your
              choice.
            </Text>
            <Text className="text-lg font-semibold mt-3 text-yellow-300">
              A New Way to Learn: Courses that Make Learning Fun and Easy
            </Text>
            <Image
              source={require("@/assets/images/about-bubble2.png")}
              className="absolute -bottom-4 -left-3 w-40 h-40"
              resizeMode="contain"
            />
          </LinearGradient>
        </View>

        {/* Course List */}
        <View>
          <CourseList courseName="Nursery" folderId="22761499" />
          <CourseList courseName="Kg" folderId="22772821" />
          <CourseList courseName="Prep" folderId="22772833" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Course;
