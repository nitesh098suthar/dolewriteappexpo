import { Image, ScrollView, View, Text } from "react-native";
import PurchasedCourse from "@/components/purchased-course";
import { homePageData } from "@/components/carousel";
import Footer from "@/components/footer";
import MyCarousel from "@/components/main-carousel";
import FreeCourses from "./components/free-courses";

const FreeLessons = () => {
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
        <MyCarousel data={homePageData} />
        <Text className="text-2xl font-extrabold mt-4 text-black">
          Available FREE COURSES
        </Text>
        <FreeCourses />
        <Footer />
      </ScrollView>
    </View>
  );
};

export default FreeLessons;
