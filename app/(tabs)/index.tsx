import SearchBar from "@/components/SearchBar";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movie-card";
import { useState } from "react";
export default function Index() {
  // const [searchQuery, setSearchQuery] = useState("");

  // const router = useRouter();
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));
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
          paddingBottom: 10,
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
            An Digital Learning Platform for kids.{" "}
          </Text>
          <Text className="text-xl font-semibold mt-3 text-primary">
            A New Way to Learn: Courses that Make Learning Fun and Easy
          </Text>
        </View>

        {movieLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className="mt-10-center"
          />
        ) : movieError ? (
          <Text style={{ color: "black" }}>Error: {movieError?.message}</Text>
        ) : (
          <View>
            {/* <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
            /> */}
            <Text className="capitalize text-xl mt-5 font-bold text-black mb-3">
              Your Courses
            </Text>
            <>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                // style={{ flexDirection: "row", overflow: "scroll" }}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 12,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
