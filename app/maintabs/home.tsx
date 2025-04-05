import { Image, ScrollView, View, Text } from "react-native";
import { useRouter } from "expo-router";
import PurchasedCourse from "@/components/purchased-course";

import Footer from "@/components/footer";
import MyCarousel from "@/components/main-carousel";

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
        className="px-5 mt-16"
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <MyCarousel />
        <Text className="text-2xl font-extrabold mt-4 text-black">
          Your Courses
        </Text>
        <PurchasedCourse />
        <Footer />
      </ScrollView>
    </View>
  );
}
