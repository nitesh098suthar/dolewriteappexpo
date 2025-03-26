import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { vimeoHttpClient } from "@/services/api";

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
  }, [id]);

  const handleCheckboxClick = (index: number) => {
    let updatedLectures = [...completedLectures];

    if (updatedLectures.includes(index)) {
      updatedLectures = updatedLectures.filter((i) => i !== index);
    } else {
      updatedLectures.push(index);
    }

    setCompletedLectures(updatedLectures);
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F97316" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        {currentVideoUrl && (
          <View style={{ backgroundColor: "#F6F6F6", padding: 16, borderRadius: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
              {lectureName}
            </Text>
            <Text style={{ fontSize: 16 }}>{description?.split("&&&")[0]}</Text>
          </View>
        )}
      </View>

      <View style={{ backgroundColor: "#F6F6F6", padding: 16, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
          Lessons
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Mark If Completed</Text>
          <Text style={{ fontWeight: "bold" }}>Assessment</Text>
        </View>

        {videos?.map((video, index) => (
          <View key={video?.uri} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <TouchableOpacity
              style={[
                { flex: 1, padding: 12, borderRadius: 8, marginRight: 8 },
                completedLectures.includes(index)
                  ? { backgroundColor: "green" }
                  : activeVideoIndex === index
                  ? { backgroundColor: "blue" }
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
                <TouchableOpacity onPress={() => handleCheckboxClick(index)}>
                  <View
                    style={[
                      { width: 15, height: 15, borderWidth: 1, borderColor: "black", marginRight: 8 },
                      completedLectures.includes(index) && { backgroundColor: "green" },
                    ]}
                  />
                </TouchableOpacity>
                <Text style={{ fontSize: 14 }}>{video?.name}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: "#D9D9D9", padding: 10, borderRadius: 8 }}
              onPress={() =>
                Linking.openURL(video?.description?.split("&&&")[1] || "https://wordwall.net/")
              }
            >
              <Text style={{ fontWeight: "bold" }}>Go</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Lessons;