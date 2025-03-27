import { Image, ScrollView, View, Text } from "react-native";
import PurchasedCourse from "@/components/purchased-course";

export default function Index() {
  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 80 }}
      >
        <View className="mt-20">
          <Image
            source={require("@/assets/images/home-banner.png")}
            className="w-full h-64"
            resizeMode="contain"
          />

          {/* Heading Below Home Banner */}
          <Text className="text-2xl font-extrabold mt-4 text-gray-800">
            Your Courses
          </Text>

          <PurchasedCourse />
        </View>
      </ScrollView>
    </View>
  );
}
