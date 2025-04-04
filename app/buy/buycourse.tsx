import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

const BuyCourse = () => {
  const handleSubscribe = () => {
    Linking.openURL("https://www.dolewrite.com/");
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 mt-16"
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

        <Text className="text-2xl font-extrabold text-left text-gray-900 mt-10">
          Subscribe Now And Give Your Child the Best Start!
        </Text>

        {/* Subscribe Now Button */}
        <TouchableOpacity
          className="mt-6 bg-[#0F172A] py-4 px-6 rounded-xl w-40"
          onPress={handleSubscribe}
        >
          <Text className="text-white text-center text-md font-semibold text-nowrap">
            Subscribe Now
          </Text>
        </TouchableOpacity>

        <View className="mt-8">
          <Text className="text-2xl font-extrabold text-left text-gray-900">
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

          <Text className="text-2xl font-extrabold text-left text-gray-900 mt-10">
            How to Get Access?
          </Text>
          <Text className="text-lg text-gray-700 mt-2">
            Subscribing is simple! Follow these easy steps:
          </Text>

          {/* Steps List with Clickable Link */}
          <View className="mt-4">
            {[
              {
                text: "Visit our website - ",
                link: "Dolewrite.com/subscribe",
                isLink: true,
              },
              { text: "Choose a subscription plan that fits your needs" },
              { text: "Complete the payment securely" },
              { text: "Enjoy unlimited learning & fun!" },
              { text: "Subscribing is simple!" },
            ].map((item, index) => (
              <Text key={index} className="text-lg text-gray-700">
                {index + 1}.{" "}
                {item.isLink ? (
                  <>
                    {item.text}
                    <Text
                      className="text-blue-500 underline"
                      onPress={() =>
                        Linking.openURL("https://www.dolewrite.com/")
                      }
                    >
                      {item.link}
                    </Text>
                  </>
                ) : (
                  item.text
                )}
              </Text>
            ))}
          </View>

        <View className="mt-10">
          <Text className="text-2xl font-extrabold text-left text-gray-900">
            What’s Included in Your Subscription?
          </Text>
          </View>

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
        </View>
      </ScrollView>
    </View>
  );
};

export default BuyCourse;
