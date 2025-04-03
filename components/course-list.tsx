import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { vimeoHttpClient } from "@/services/api";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import SubjectCard from "./subject-card";

const CourseList = ({
  courseName,
  folderId,
}: {
  courseName: string;
  folderId: string;
}) => {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const {
          data: { data },
        } = await vimeoHttpClient.get(`/me/projects/${folderId}/items`);
        // console.log("data in api", data);
        setSubjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsError("Error fetching videos.");
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [folderId]);

  const renderItem = ({ item }: { item: any }) => {
    if (item && item.folder && item.folder.name) {
      return (
        <Link
          href="/buy/buycourse"
          style={{
            flex: 1,
            padding: 10,
            margin: 5,
          }}
        >
          <SubjectCard subjectName={item.folder.name} />
        </Link>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 10,
            margin: 5,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Text>Item Name Not Available</Text>
        </View>
      );
    }
  };

  return (
    <View>
      {isLoading ? (
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>
      ) : isError ? (
        <Text style={{ color: "black", margin: 10 }}>Error: {isError}</Text>
      ) : (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              marginTop: 20,
              left: -10,
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
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                {courseName}
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

          {/* Course List */}
          <FlatList
            data={subjects}
            renderItem={renderItem}
            style={{ marginTop: 10 }}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default CourseList;
