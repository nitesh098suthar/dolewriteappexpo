import { Image, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import PurchasedCourse from "@/components/purchased-course";

export default function Index() {
  const router = useRouter();

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
          {/* Login Button with Gradient */}
          <TouchableOpacity
            className="mb-4 self-end"
            onPress={() => router.push("/auth/login")}
          >
            <LinearGradient
              colors={["#D50E12", "#F8BC24"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 30,
              }}
            >
              <Text className="text-white font-bold text-lg">Login</Text>
            </LinearGradient>
          </TouchableOpacity>

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
