import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SubjectCard = ({ subjectName }: { subjectName: string }) => {
  return (
    <SafeAreaView>
      <View
        className="bg-secondary p-3 w-full my-2"
        style={{ flexDirection: "row", borderRadius: 10 }}
      >
        <View
          style={{
            width: "50%",
            aspectRatio: 5 / 4,
            overflow: "hidden",
            borderRadius: 5,
          }}
        >
          <Image
            source={require("@/assets/images/thumbnails/gen.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="thumbnails"
          />
        </View>
        <View className="w-1/2 flex-1 items-start justify-center p-4">
          <Text className="font-bold text-gray-900">
            {subjectName.split(",")[0]}
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 12,
            }}
          >
            <View
              className=""
              style={{
                flexDirection: "row",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 20,
                  aspectRatio: 1 / 1,
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Image
                  source={require("@/assets/images/cardIcons/teacher.png")}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                  alt="thumbnails"
                />
              </View>
              <Text className="text-xs">Linda</Text>
            </View>
            <View
              className=""
              style={{
                flexDirection: "row",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 14,
                  aspectRatio: 1 / 1,
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Image
                  source={require("@/assets/images/cardIcons/card-star.png")}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                  alt="thumbnails"
                />
              </View>
              <Text className="text-xs">
                &#40;{subjectName.split(",")[1]} Reviews&#41;
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              className=""
              style={{
                flexDirection: "row",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 14,
                  aspectRatio: 1 / 1,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={require("@/assets/images/cardIcons/card-book.png")}
                  tintColor={"#F97316"}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                  alt="thumbnails"
                />
              </View>
              <Text className="text-xs">
                {subjectName.split(",")[2]} Lectures
              </Text>
            </View>
            <View
              className=""
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
              }}
            >
              <View
                style={{
                  width: 14,
                  aspectRatio: 1 / 1,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={require("@/assets/images/cardIcons/card-clock.png")}
                  tintColor={"#F97316"}
                  resizeMode="stretch"
                  style={{ width: "100%", height: "100%" }}
                  alt="thumbnails"
                />
              </View>
              <Text className="text-xs">{subjectName.split(",")[3]} Mins</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubjectCard;
