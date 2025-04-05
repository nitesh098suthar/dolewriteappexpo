import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { httpClient } from "@/services/api";

interface ProfileInfoProps {
  label: string;
  value?: string | number | null;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View className="w-full items-center justify-center px-4">
    <Text className="text-white text-2xl font-semibold mb-2 text-center">
      {label}
    </Text>
    <Text className="text-white/90 text-lg text-center mb-2">
      {value || "N/A"}
    </Text>
  </View>
);

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const credentialsString = await AsyncStorage.getItem("userCredentials");
        if (credentialsString) {
          const credentials = JSON.parse(credentialsString);
          const { id } = credentials;

          const response = await httpClient.get(`/user/${id}`);
          setProfileData(response.data.getauth);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          // Handle case where user credentials are not found (e.g., redirect to login)
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setIsLoading(false);
        // Handle error (e.g., show error message)
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userCredentials");
      router.replace("/auth/login"); // Navigate to login after logout
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error (e.g., show an alert)
    }
  };
  return (
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 mt-16"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center">
          <View className="w-[100%] rounded-3xl overflow-hidden shadow-lg">
            <ScrollView>
              <LinearGradient
                colors={["#F97316", "#290000"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="p-6 items-center relative"
              >
                <Text className="text-white text-3xl font-bold mt-6 mb-6 text-center">
                  My Profile
                </Text>
                <View className="items-center justify-center w-full">
                  <View className="relative w-40 h-40 mb-6 items-center justify-center">
                    <Image
                      source={require("@/assets/images/profile-kitty.png")}
                      className="w-40 h-40 rounded-full"
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <ProfileInfo
                  label="Subscribed Class"
                  value={isLoading ? "Loading..." : profileData?.generatedType}
                />
                <View className="w-full h-[1px] bg-white/20 my-4" />

                <ProfileInfo
                  label="Your ID"
                  value={isLoading ? "Loading..." : profileData?.id}
                />
                <View className="w-full h-[1px] bg-white/20 my-4" />

                <ProfileInfo
                  label="School Name"
                  value={isLoading ? "Loading..." : profileData?.schoolName}
                />

                <TouchableOpacity
                  className="mt-6 w-full items-center"
                  onPress={handleLogout}
                >
                  <View className="bg-[#F97316] py-1 px-4 rounded-full w-[118px] h-[45px] flex-row items-center justify-center mb-8">
                    <Image
                      source={require("@/assets/images/profile-icon.png")}
                      className="w-5 h-5 mr-2 ml-2"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-lg font-semibold mr-2">
                      Log Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </View>
        </View>

        <View className="mt-10 px-5">
          <View className="mt-6 flex items-center">
            <Image
              source={require("@/assets/images/profile-kids.png")}
              className="w-[480px] h-[480px]"
              resizeMode="contain"
            />
          </View>

          <View className="mt-10 h-20 bg-white p-6 w-full">
            <Text></Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
