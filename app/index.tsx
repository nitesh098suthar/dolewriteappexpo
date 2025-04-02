import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { httpClient } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      const credentialsString = await AsyncStorage.getItem("userCredentials");
      if (credentialsString) {
        const credentials = JSON.parse(credentialsString);
        const { id, password } = credentials;

        console.log("credentials from internal storage", id, password);

        const response = await httpClient.post("/user/validate", {
          id,
          password,
        });

        console.log("response from the validation : ", response.data);

        if (response.data.valid) {
          router.replace("/maintabs/home");
        } else {
          router.replace("/auth/login");
        }
      } else {
        router.replace("/auth/login");
      }
    } catch (error) {
      console.error("Login check error:", error);
      router.replace("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default Index;
