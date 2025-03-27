import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { vimeoHttpClient } from "@/services/api";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SubjectCard from "./subject-card";

const PurchasedCourse = () => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loggedInUser = {
    name: "Nitesh",
    generatedType: "Nursery",
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const {
          data: { data },
        } = await vimeoHttpClient.get("/me/projects/22772763/items");

        const folder = data.find(
          (folder: any) =>
            folder?.folder?.name?.toLowerCase() ===
            loggedInUser?.generatedType.toLowerCase()
        );

        loadSubjects(folder?.folder?.uri);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const loadSubjects = (uri: string) => {
    setIsLoading(true);
    const projectId = uri.slice(-8);
    const fetchSubjects = async () => {
      try {
        const response = await vimeoHttpClient.get(
          `/me/projects/${projectId}/items`
        );
        setSubjects(response?.data?.data);
        console.log(response.data.data);
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
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
              marginLeft: 0, 
            }}
          >
            <LinearGradient
              colors={["#D50E12", "#F8BC24"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Nursery
              </Text>
            </LinearGradient>
          </View>

          {/* Course List */}
          <FlatList
            data={subjects}
            renderItem={renderItem}
            keyExtractor={(item) => item.folder.resource_key}
            style={{ marginTop: 10 }}
          />
        </View>
      )}
    </View>
  );
};

export default PurchasedCourse;
