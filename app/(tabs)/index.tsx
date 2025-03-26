import SearchBar from "@/components/SearchBar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import PurchasedCourse from "@/components/purchased-course";
export default function Index() {
  // const [searchQuery, setSearchQuery] = useState("");

  // const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="z-0 absolute w-full"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 40,
          marginBottom: 40,
        }}
        // style={{ flexDirection: "column" }}
      >
        {/* <Image
          source={require("@/assets/icons/logo.png")}
          className="w-12 h-10 mt-20 mb-5 mx-auto"
        /> */}
        <View className="mt-10">
          <Text className="text-4xl font-extrabold mt-14 ">
            Welcome to Dolewrite!
          </Text>
          <Text className="text-xl font-semibold mt-3">
            A Digital Learning Platform for kids.{" "}
          </Text>
          <Text className="text-xl font-semibold mt-3 text-primary">
            A New Way to Learn, A Courses that Make Learning Fun and Easy
          </Text>
        </View>
          <PurchasedCourse />
      </ScrollView>
    </View>
  );
}
