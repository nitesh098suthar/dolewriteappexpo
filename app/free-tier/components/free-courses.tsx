import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { httpClient, vimeoHttpClient } from "@/services/api";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubjectCard from "@/components/subject-card";
import HomePageSkeleton from "@/components/hp-skeleton";
import VideoCard from "./video-card";
// import VideoCard from "./video-card";

const FreeCourses = () => {
  const [subjects, setSubjects] = useState([]);
  const [freeCourseVideos, setSetFreeCourseVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const credentialsString = await AsyncStorage.getItem("userCredentials");
        if (credentialsString) {
          const credentials = JSON.parse(credentialsString);
          const { id } = credentials;

          const response = await httpClient.get(`/user/${id}`);
          setLoggedInUser(response.data.getauth);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const response = await vimeoHttpClient.get(
          "/me/projects/25772834/videos"
        );
        setSetFreeCourseVideos(response?.data?.data);
        console.log(response.data.data[0].name);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [loggedInUser]);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View>
        <VideoCard videoData={item} />
      </View>
    );
  };

  return (
    <View>
      {isLoading ? (
        <View style={{ marginTop: 16 }}>
          <HomePageSkeleton onlyCards={false} />
        </View>
      ) : (
        <View>
          {loggedInUser ? <Text>logged In</Text> : <Text>Not logged in</Text>}

          <FlatList
            data={freeCourseVideos}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default FreeCourses;
