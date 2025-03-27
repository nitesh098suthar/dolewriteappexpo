import { Image, ScrollView, View } from "react-native";
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
        <View className="mt-8">
          {/* Home Banner Image without centering */}
          <Image
            source={require("@/assets/images/home-banner.png")}
            className="w-full h-64"
            resizeMode="contain"
          />
          <PurchasedCourse />
        </View>
      </ScrollView>
    </View>
  );
}
