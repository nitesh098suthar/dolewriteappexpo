import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { vimeoHttpClient } from "@/services/api";

const PurchasedCourse = () => {
  const [subjects, setSubjects] = useState([]); // Initialize with an empty array
  const [className, setClassName] = useState<any>(null); // Track the selected folder
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
        // console.log(data);
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
        setSubjects(response?.data?.data); // Update with data array
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setIsLoading(false);
      }
    };
    fetchSubjects();
  };
  const renderItem = ({ item }: { item: any }) => (
    <View>
      <Text>{item.folder.name}</Text>
    </View>
  );
  return (
    <View>
      <Text>{loggedInUser.generatedType}</Text>
      <FlatList
        data={subjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.folder.resource_key}
      />
    </View>
  );
};

export default PurchasedCourse;
