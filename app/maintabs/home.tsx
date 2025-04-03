import { Image, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import PurchasedCourse from "@/components/purchased-course";
import * as Keychain from "react-native-keychain";
import { useEffect } from "react";
import { httpClient } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Credentials {
  id: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  return (
    <View className="bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
        alt="linear gradient background with white lines"
      />
      <ScrollView
        className="px-5 mt-12"
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
            overflow: "hidden",
          }}
        >
          <Image
            source={require("@/assets/images/home-box.png")}
            resizeMode="stretch"
            style={{ width: "100%", height: "100%" }}
            alt="home page sliding banners"
          />
        </View>
        <Text className="text-2xl font-extrabold mt-4 text-gray-800">
          Your Courses
        </Text>
        <PurchasedCourse />
      </ScrollView>
    </View>
  );
}
