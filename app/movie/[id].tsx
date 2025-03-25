import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justif-center mt-5">
    <Text className="text-black font-normal text-sm ">{label}</Text>
    <Text className="text-black font-bold text-sm mt-2 ">{value || "N/A"}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="cover"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-black font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-black text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-black text-sm">{movie?.runtime}m</Text>
          </View>
          <View
            className="flex-row items-center mt-2"
            style={{
              backgroundColor: "#0f0d23",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}
          >
            <Image
              source={require("@/assets/icons/star.png")}
              className="size-4"
            />
            <Text className="text-black font-bold" style={{ marginRight: 6 }}>
              {movie?.vote_average}
            </Text>
            <Text className="text-black text-sm">
              ({movie?.vote_count} Votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g: any) => g.name).join(" - ") || "N/A"}
          />
          <View
            className="flex flex-row justify-between"
            style={{ width: "50%" }}
          >
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1_000_000} million` || "N/A"}
            />
            <MovieInfo
              label="Revenue"
              value={
                `$${Math.round(movie?.revenue) / 1_000_000} million` || "N/A"
              }
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ?.map((c: any) => c.name)
                .join(" - ") || "N/A"
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
