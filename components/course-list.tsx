import { View, Text } from "react-native";
import React from "react";
import SearchBar from "@/components/SearchBar";
import { ActivityIndicator, FlatList, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/course-card";
import { useState } from "react";
const CourseList = ({ courseName }: { courseName: string }) => {
  const {
    data: movies,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View>
      {movieLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#F97316"}
          className="mt-10-center"
        />
      ) : movieError ? (
        <Text style={{ color: "black" }}>Error: {movieError?.message}</Text>
      ) : (
        <View>
          <View
            className="flex-1 items-center justify-between"
            style={{ flexDirection: "row", backgroundColor: "" }}
          >
            <Text className="capitalize text-2xl mt-8 font-bold text-black mb-3 ">
              {courseName}
            </Text>
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#F97316",
                marginTop: 20,
                marginHorizontal: 10,
              }}
            ></View>
          </View>
          <>
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              // style={{ flexDirection: "row", overflow: "scroll" }}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 14,
                paddingRight: 5,
                marginBottom: 14,
              }}
              className="mt-2"
              scrollEnabled={false}
            />
          </>
        </View>
      )}
    </View>
  );
};

export default CourseList;
