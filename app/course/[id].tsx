import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { vimeoHttpClient } from "@/services/api";
import { WebView } from "react-native-webview";
import CourseDetailSkeleton from "@/components/cd-skeleton";
import Skeleton from "@/components/skeleton";

interface VideoData {
  player_embed_url: string;
  name: string;
  uri: string;
  description: string | null;
}

const Lessons = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [completedLectures, setCompletedLectures] = useState<number[]>([]);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [lectureName, setLectureName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const storageKey = `completedLectures_${id}`;

  useEffect(() => {
    const fetchingSubjectData = async () => {
      try {
        setIsLoading(true);
        const res = await vimeoHttpClient.get(`/me/projects/${id}/videos`);

        const videoData = res?.data?.data?.map((video: any) => ({
          player_embed_url: video.player_embed_url,
          name: video.name,
          uri: video.uri,
          description: video.description,
        }));

        setVideos(videoData || []);

        if (videoData.length > 0) {
          setCurrentVideoUrl(videoData[0]?.player_embed_url);
          setLectureName(videoData[0]?.name || "");
          setDescription(videoData[0]?.description || "");
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      }
    };

    fetchingSubjectData();
    loadCompletedLectures(); // Load completed lectures for this subject
  }, [id]);

  const loadCompletedLectures = async () => {
    try {
      const storedLectures = await AsyncStorage.getItem(storageKey);
      if (storedLectures) {
        setCompletedLectures(JSON.parse(storedLectures));
      }
    } catch (error) {
      console.error("Error loading completed lectures:", error);
    }
  };

  const handleCheckboxClick = async (index: number) => {
    let updatedLectures = [...completedLectures];

    if (updatedLectures.includes(index)) {
      updatedLectures = updatedLectures.filter((i) => i !== index);
    } else {
      updatedLectures.push(index);
    }

    setCompletedLectures(updatedLectures);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedLectures));
  };

  const handleVideoTitleClick = (
    index: number,
    videoUrl: string,
    name: string,
    description: string | null
  ) => {
    setCurrentVideoUrl(videoUrl);
    setActiveVideoIndex(index);
    setLectureName(name);
    setDescription(description || "");
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ marginBottom: 16 }}>
          {isLoading ? (
            <View className="mt-16">
              <Skeleton height={250} />
              <Skeleton height={40} />
            </View>
          ) : (
            currentVideoUrl && (
              <View
                style={{
                  height: 300,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                className="mt-11"
              >
                <WebView
                  source={{
                    uri: currentVideoUrl,
                    headers: {
                      Referer: "https://www.dolewrite.com",
                    },
                  }}
                  style={{ flex: 1 }}
                  allowsFullscreenVideo={true}
                  mediaPlaybackRequiresUserAction={false}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 12,
                  }}
                >
                  {lectureName.charAt(0).toUpperCase() + lectureName.slice(1)}
                </Text>
              </View>
            )
          )}
        </View>

        <View
          style={{ backgroundColor: "#F6F6F6", padding: 16, borderRadius: 8 }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
            Lessons
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontSize: 14, marginBottom: 4, fontWeight: "bold" }}>
              Mark If Completed
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 4, fontWeight: "bold" }}>
              Assessment
            </Text>
          </View>

          {isLoading ? (
            <CourseDetailSkeleton />
          ) : (
            videos?.map((video, index) => (
              <View
                key={video?.uri}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                {/* Video Title Button */}
                <TouchableOpacity
                  style={[
                    { flex: 1, padding: 12, borderRadius: 8, marginRight: 8 },
                    activeVideoIndex === index
                      ? { backgroundColor: "#F97316" }
                      : { backgroundColor: "#D9D9D9" },
                  ]}
                  onPress={() =>
                    handleVideoTitleClick(
                      index,
                      video.player_embed_url,
                      video.name,
                      video.description
                    )
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Checkbox */}
                    <TouchableOpacity
                      onPress={() => handleCheckboxClick(index)}
                    >
                      <View
                        style={{
                          width: 18,
                          height: 18,
                          borderWidth: 1,
                          borderColor: "gray",
                          borderRadius: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 8,
                          backgroundColor: completedLectures.includes(index)
                            ? "transparent"
                            : "white",
                        }}
                      >
                        {completedLectures.includes(index) && (
                          <Text style={{ color: "green", fontWeight: "bold" }}>
                            ✔
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>

                    <Text className="text-white font-bold">
                      {video?.name.charAt(0).toUpperCase() +
                        video?.name.slice(1)}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Assessment Button */}
                <TouchableOpacity
                  className="bg-primary"
                  style={{
                    borderRadius: 8,
                    width: 44,
                    aspectRatio: 1 / 1,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    Linking.openURL(
                      video?.description?.split("&&&")[1] ||
                        "https://wordwall.net/"
                    )
                  }
                >
                  <Image
                    source={require("@/assets/icons/assessment.png")}
                    tintColor={"white"}
                    style={{ aspectRatio: 1 / 1, height: 24, width: 24 }}
                  />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Lessons;
