import { vimeoHttpClient } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Skeleton from "@/components/skeleton";
import { WebView } from "react-native-webview";
import { VideoData } from "@/app/course/[id]";
const FreeVideo = () => {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
  const [currentVideoData, setCurrentVideoData] = useState<VideoData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useLocalSearchParams();
  const getCurrentVideo = async () => {
    try {
      setIsLoading(true);
      const response = await vimeoHttpClient.get(`/videos/${id}`);
      if (response.data) {
        setCurrentVideoData(response.data);
        setCurrentVideoUrl(response.data.player_embed_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCurrentVideo();
  }, []);
  return (
    <View className="px-5">
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
                  marginTop: 10,
                }}
              >
                {currentVideoData?.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  marginTop: 6,
                }}
              >
                {currentVideoData?.description
                  ? currentVideoData.description
                  : "Video Description Here"}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default FreeVideo;
