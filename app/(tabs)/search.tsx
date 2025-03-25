import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={require("@/assets/images/bg.png")}
        className="flex-1 w-full absolute z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 12,
          paddingRight: 5,
          marginBottom: 10,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-12 h-10"
              />
            </View>
            <View style={{ marginVertical: 12 }}>
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {movieLoading && (
              <ActivityIndicator
                size={"large"}
                color={"#0000ff"}
                className="my-3"
              />
            )}
            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error : {movieError?.message}
              </Text>
            )}
            {!movieLoading &&
              !movieError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text
                  className="text-md text-black font-bold"
                  style={{ marginVertical: 12 }}
                >
                  Search Result for{" "}
                  <Text style={{ color: "#AB8BFF" }}>{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
