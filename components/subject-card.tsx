import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";

const SubjectCard = ({ subjectName }: { subjectName: string }) => {
  return (
    <SafeAreaView>
      <View
        className="w-full flex-row bg-[#f6f6f6] p-6 rounded-2xl mb-14"
        style={{ height: 200 }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={require("@/assets/images/card-img.png")}
            style={{ width: "140%", height: "100%" }}
            resizeMode="stretch"
          />
        </View>

        <View style={{ flex: 1, paddingLeft: 56, justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#f97316",
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 20,
              alignSelf: "flex-start",
              marginBottom: 10, 
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              Button Text
            </Text>
          </TouchableOpacity>

          <Text className="text-xl font-bold text-gray-900">
            {subjectName.split(",")[0]}
          </Text>

          <View className="flex-row items-center mt-4">
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
