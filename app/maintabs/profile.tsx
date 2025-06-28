import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpClient } from "@/services/api";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface ProfileInfoProps {
  label: string;
  value?: string | number | null;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View className="w-full items-center justify-center px-4 mb-4">
    <Text className="text-white text-xl font-semibold mb-1 text-center">
      {label}
    </Text>
    <Text className="text-white text-base text-center">
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
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userCredentials");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* ✅ Background image */}
      <Image
        source={require("@/assets/images/bg.png")}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <ScrollView
        className="px-5 mt-16"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="items-center justify-center">
          <LinearGradient
            colors={["#F97316", "#290000"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="w-full rounded-3xl overflow-hidden p-6"
          >
            <Text className="text-3xl font-bold text-center text-white mb-10">
              My Profile
            </Text>

            <View className="items-center mb-10">
              <Image
                source={require("@/assets/images/profile/profile-smile.png")}
                className="w-40 h-40 rounded-full"
                resizeMode="contain"
              />
            </View>

            <ProfileInfo label="Subscription" value="Active" />
            <View className="border-t border-white my-2" />

            <ProfileInfo
              label="Your ID"
              value={isLoading ? "Loading..." : profileData?.id}
            />
            <View className="border-t border-white my-2" />

            <ProfileInfo
              label="School Name"
              value={isLoading ? "Loading..." : profileData?.schoolName}
            />
            <View className="border-t border-white my-2" />

            <ProfileInfo label="Account Type" value="Owner" />
            <View className="border-t border-white my-2" />

            <TouchableOpacity
              className="mt-6 w-full items-center"
              onPress={handleLogout}
            >
              <View className="bg-[#F97316] py-2 px-4 rounded-full w-[140px] h-[45px] items-center justify-center">
                <Text className="text-white text-lg font-semibold">
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View className="mt-16 px-5">
          <Text className="text-center text-3xl font-bold text-gray-800 mb-4">
            Need Help?
          </Text>
          <Text className="text-left text-base font-medium">
            Have questions? Check out our FAQs or contact Customer Support for
            quick assistance.
          </Text>

          <View className="mt-10 space-y-4">
            <TouchableOpacity
              onPress={() => Linking.openURL("https://wa.me/919782222212")}
            >
              <View className="flex-row items-start space-x-3 px-4">
                <MaterialIcons name="phone" size={22} color="#F97316" />
                <Text className="text-lg ml-4 font-medium">
                  +91-97822 22212
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:support@dolewrite.com")}
            >
              <View className="flex-row items-start space-x-3 px-4">
                <MaterialIcons className = "mt-4" name="email" size={22} color="#F97316" />
                <Text className="text-lg ml-4 mt-4 font-medium">
                  support@dolewrite.com
                </Text>
              </View>
            </TouchableOpacity>

            <View className="flex-row items-start space-x-3 px-4">
              <MaterialIcons className = "mt-4" name="location-on" size={24} color="#F97316" />
              <Text className="text-lg ml-4 mt-4 font-medium">
                B3 Shankar Bhawan, Govind Marg, Raja park (Jaipur)
              </Text>
            </View>

            <View className="items-center">
              <Image
                source={require("@/assets/images/profile/book.png")}
                className="w-[360px] h-[360px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
