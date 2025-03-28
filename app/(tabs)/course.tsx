import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import CourseList from "@/components/course-list";

const Course = () => {
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
          <Text className="text-4xl font-extrabold mt-14 ">
            Available Courses
          </Text>
          <Text className="text-xl font-semibold mt-3">
            We've multiple other courses you can purchase according to your
            choice.
          </Text>
          <Text className="text-xl font-semibold mt-3 text-primary">
            A New Way to Learn: Courses that Make Learning Fun and Easy
          </Text>
        </View>
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
