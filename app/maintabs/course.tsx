import { View, ScrollView, Image, Text } from "react-native";
import React from "react";
import CourseList from "@/components/course-list";

const Course = () => {
  return (
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
        alt="background line image"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
        className="flex-1 px-5 mt-12"
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/course-box.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="Course Box Banner"
          />
        </View>

        {/* Left-Aligned Heading */}
        <Text className="text-2xl font-extrabold mt-4">All Available Courses</Text>

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
