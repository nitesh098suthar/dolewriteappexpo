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
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
        alt="linear gradient background with white lines"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 80 }}
      >
        <View className="mt-14">
          <Image
            source={require("@/assets/images/home-banner.png")}
            className="w-full h-64"
            resizeMode="contain"
            alt="home page sliding banners"
          />
          {
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text className="text-2xl font-extrabold mt-4 text-gray-800">
                Your Courses
              </Text>
            </TouchableOpacity>
          }
          <PurchasedCourse />
        </View>
      </ScrollView>
    </View>
  );
}
