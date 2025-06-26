import { vimeoHttpClient } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Skeleton from "@/components/skeleton";
import { WebView } from "react-native-webview";

const FreeVideo = () => {
  const [currentVideo, setCurrentVideo] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useLocalSearchParams();
  const getCurrentVideo = async () => {
    try {
      const response = await vimeoHttpClient.get(`/videos/${id}`);
      console.log(response.data);
      if (response.data) setCurrentVideo(response.data.player_embed_url);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentVideo();
  }, []);
  return (
    <View>
      <View style={{ marginBottom: 16 }}>
        {isLoading ? (
          <View className="mt-16">
            <Skeleton height={250} />
            <Skeleton height={40} />
          </View>
        ) : (
          currentVideo && (
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
                  uri: currentVideo,
                  headers: {
                    Referer: "https://www.dolewrite.com",
                  },
                }}
                style={{ flex: 1 }}
                allowsFullscreenVideo={true}
                mediaPlaybackRequiresUserAction={false}
              />
              {/* <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 12,
                }}
              >
                {lectureName.charAt(0).toUpperCase() + lectureName.slice(1)}
              </Text> */}
            </View>
          )
        )}
      </View>
    </View>
  );
};

export default FreeVideo;
