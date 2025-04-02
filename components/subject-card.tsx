import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";

const SubjectCard = ({ subjectName }: { subjectName: string }) => {
  return (
    <SafeAreaView>
      <View
        className="w-full flex-row items-center bg-[#f6f6f6] p-6 rounded-2xl mb-14"
        style={{ height: 170 }} // Slightly increased height for better spacing
      >
        <Image
          source={require("@/assets/images/card-img.png")}
          className="w-40 h-40" // Adjusted size for better fit
          resizeMode="contain"
        />

        {/* Right Side Content */}
        <View className="flex-1 ml-6">
          {/* Heading */}
          <Text className="text-xl font-bold text-gray-900">
            {subjectName.split(",")[0]}
          </Text>

          {/* Book & Clock in One Line */}
          <View className="flex-row items-center mt-4">
            {/* Book Icon & Text */}
            <View className="flex-row items-center mr-8">
              <Image
                source={require("@/assets/images/card-book.png")}
                className="w-5 h-5"
                style={{ tintColor: "gray" }}
                resizeMode="contain"
              />
              <Text className="text-gray-600 text-base ml-2">
                {subjectName.split(",")[2]}
              </Text>
            </View>

            {/* Clock Icon & Text */}
            <View className="flex-row items-center">
              <Image
                source={require("@/assets/images/card-clock.png")}
                className="w-5 h-5"
                style={{ tintColor: "gray" }}
                resizeMode="contain"
              />
              <Text className="text-gray-600 text-base ml-2">
                {subjectName.split(",")[3]}
              </Text>
            </View>
          </View>

          {/* Reviews */}
          <View className="flex-row items-center mt-4">
            <Image
              source={require("@/assets/images/card-star.png")}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-gray-600 text-base ml-2">
              {subjectName.split(",")[1]}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubjectCard;
