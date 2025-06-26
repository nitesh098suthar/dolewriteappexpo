import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const VideoCard = ({ videoData }: any) => {
  return (
    <Link
      style={{ marginTop: 12 }}
      href={{
        pathname: "/free-tier/videos/[id]",
        params: { id: videoData.uri.slice(-10) },
      }}
    >
      <View
        className="bg-secondary p-3 w-full"
        style={{
          flexDirection: "row",
          borderRadius: 10,
          marginBottom: 12,
        }}
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
            source={require("@/assets/images/about/about-main.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="thumbnails"
          />
        </View>
        <View className="w-1/2 flex-1 items-start justify-center p-4">
          <Text className="font-bold text-md text-gray-900">
            {videoData.name}
          </Text>
          <Text className="text-sm text-gray-900">
            {videoData.description !== null
              ? videoData.description
              : "Description Here"}
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
              <Text className="text-xs">Michel</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>
      </View>
    </Link>
  );
};

export default VideoCard;
