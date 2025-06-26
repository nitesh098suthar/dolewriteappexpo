import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { httpClient, vimeoHttpClient } from "@/services/api";
import { Link } from "expo-router";
import SubjectCard from "./subject-card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePageSkeleton from "./hp-skeleton";

const PurchasedCourse = () => {
  const [subjects, setSubjects] = useState([]);
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
    if (loggedInUser) {
      setIsLoading(true);
      const fetchCourses = async () => {
        try {
          const {
            data: { data },
          } = await vimeoHttpClient.get("/me/projects/22772763/items");

          const folder = data.find(
            (folder: any) =>
              folder?.folder?.name?.toLowerCase() ===
              loggedInUser?.generatedType?.toLowerCase()
          );

          loadSubjects(folder?.folder?.uri);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching videos:", error);
          setIsLoading(false);
        }
      };

      fetchCourses();
    }
  }, [loggedInUser]);

  const loadSubjects = (uri: string) => {
    setIsLoading(true);
    const projectId = uri.slice(-8);
    const fetchSubjects = async () => {
      try {
        const response = await vimeoHttpClient.get(
          `/me/projects/${projectId}/items`
        );
        setSubjects(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      }
    };

    fetchSubjects();
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Link href={`/course/${item.folder.uri.slice(-8)}`}>
        <SubjectCard subjectName={item.folder.name} />
      </Link>
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
          {loggedInUser && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                marginLeft: 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 30,
                  backgroundColor: "#f97316",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "white",
                    textTransform: "capitalize",
                  }}
                >
                  {loggedInUser.generatedType}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#F97316",
                  marginLeft: 10,
                }}
              />
            </View>
          )}

          {/* Course List */}
          <FlatList
            data={subjects}
            renderItem={renderItem}
            keyExtractor={(item) => item.folder.resource_key}
            style={{ marginTop: 16 }}
          />
        </View>
      )}
    </View>
  );
};

export default PurchasedCourse;
