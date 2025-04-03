import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

const BuyCourse = () => {
  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 mt-12"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Buy Box Image */}
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/buy-box.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="Buy Course Banner"
          />
        </View>

        <View className="mt-6">
          <Text className="text-2xl font-bold text-left text-gray-900">
            Unlock Exclusive Learning
          </Text>
          <Text className="text-2xl font-bold text-left text-gray-900">
            Content!
          </Text>

          <Text className="text-lg text-gray-700 mt-2">
            You’ve clicked on an exclusive learning video that’s part of our
            premium content! Subscribing to Dolewrite gives your child access to
            a fun, interactive, and safe learning experience designed
            specifically for ages 3-6.
          </Text>

          <Text className="text-2xl font-bold text-left text-gray-900 mt-4">
            How to Get Access?
          </Text>
          <Text className="text-lg text-gray-700 mt-2">
            Subscribing is simple! Follow these easy steps:
          </Text>

          <View className="mt-4">
            {[
              "Visit our website - Dolewrite.com/subscribe",
              "Choose a subscription plan that fits your needs",
              "Complete the payment securely",
              "Enjoy unlimited learning & fun! ",
              "Subscribing is simple!",
            ].map((item, index) => (
              <Text key={index} className="text-lg text-gray-700">
                {index + 1}. {item}
              </Text>
            ))}
          </View>

          <TouchableOpacity className="mt-6 bg-[#0F172A] py-3 px-6 rounded-xl w-40">
            <Text className="text-white text-center text-md font-semibold">
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <Text className="text-2xl font-bold text-left text-gray-900">
            What’s Included in Your Subscription?
          </Text>

          <View className="mt-4">
            {[
              "Unlimited Access ",
              "Interactive Learning",
              "Safe & Ad-Free",
              "Personalized Progress",
              "New Content Weekly",
            ].map((item, index) => (
              <View key={index} className="flex-row items-center mb-2">
                <Image
                  source={require("@/assets/images/buy-tick.png")}
                  className="w-5 h-5 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-lg text-gray-700">{item}</Text>
              </View>
            ))}
          </View>

          <Text className="text-xl font-bold text-left text-gray-900 mt-6">
            Subscribe Now & Give Your Child the Best Start!
          </Text>

          <TouchableOpacity className="mt-4 bg-[#0F172A] py-3 px-6 rounded-xl w-40">
            <Text className="text-white text-center text-md font-semibold">
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyCourse;
