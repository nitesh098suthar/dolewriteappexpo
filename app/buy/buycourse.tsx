import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const BuyCourse = () => {
  const [textWidth, setTextWidth] = useState(0);

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />

      {/* ScrollView wraps everything to prevent overlap */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80, paddingTop: 20 }} // Adjusted spacing
      >
        {/* Gradient Box Inside ScrollView */}
        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
          className="mb-8" // Added margin to create space below
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

        {/* New Section */}
        <View className="p-5 rounded-lg">
          <Text className="text-2xl font-extrabold text-left text-gray-900">
            Why Choose Our Courses?
          </Text>

          <View className="mt-4">
            <Text className="text-lg text-gray-800">✔ Expert-Led Lessons</Text>
            <Text className="text-lg text-gray-800">✔ Lifetime Access</Text>
            <Text className="text-lg text-gray-800">✔ Interactive Quizzes</Text>
            <Text className="text-lg text-gray-800">
              ✔ Certificates on Completion
            </Text>
          </View>

          <Text className="text-lg text-gray-700 mt-4">
            Our courses are designed to provide in-depth knowledge and practical
            experience. Enroll today and take a step forward in your learning
            journey!
          </Text>
        </View>

        {/* About Image and Paragraph */}
        <View className="mt-10 items-center">
          <Image
            source={require("@/assets/images/about-main.png")}
            className="w-full h-64 rounded-lg"
            resizeMode="contain"
          />
          <Text className="text-lg mt-8 px-4 text-center">
           Discover the best learning experience with wide range of
            courses tailored to suit your needs. From beginner to advanced
            levels, we ensure quality education and career growth.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyCourse;
