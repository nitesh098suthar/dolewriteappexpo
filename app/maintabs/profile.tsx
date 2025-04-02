import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileInfoProps {
  label: string;
  value?: string | number | null;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View className="w-full items-center justify-center px-4">
    <View className="w-full h-[1px] bg-white/20 my-4" />
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
  const profile = {
    id: "2342343",
    schoolname: "School of the Master Card, Jaipur",
    accountType: "Owner",
  };

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
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <ScrollView
        className="flex-1 px-5 py-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center mt-10">
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
                <View className="relative w-40 h-40 mb-6">
                  <Image
                    source={require("@/assets/images/profile-kitty.png")}
                    className="w-full h-full rounded-full"
                    resizeMode="contain"
                  />
                </View>
                <View className="items-center mb-4">
                  <Text className="text-white text-2xl font-semibold text-center">
                    Subscription
                  </Text>
                  <Text className="text-white/90 text-lg text-center">
                    Active
                  </Text>
                </View>

                <ProfileInfo label="Your ID" value={profile.id} />
                <ProfileInfo label="School Name" value={profile.schoolname} />
                <ProfileInfo label="Account Type" value={profile.accountType} />

                <View className="w-full h-[1px] bg-white/20 my-4" />
                <TouchableOpacity
                  className="mt-6 w-full"
                  onPress={handleLogout}
                >
                  <View className="bg-[#F97316] py-3 rounded-full w-full flex-row items-center justify-center">
                    <Image
                      source={require("@/assets/images/profile-icon.png")}
                      className="w-6 h-6 mr-2"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-lg font-semibold">
                      Log Out
                    </Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
            </ScrollView>
          </View>
        </View>

        {/* New Section Below Profile Box */}
        <View className="mt-10 px-5">
          <Text className="text-2xl font-extrabold mb-2">Need Help?</Text>
          <Text className="text-lg mb-4">
            Have questions? Check out our FAQs or contact Customer Support for
            quick assistance.
          </Text>

          {/* List Items with Icons */}
          <View className="space-y-3">
            <View className="flex-row items-center space-x-3">
              <Image
                source={require("@/assets/images/profile-call.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-md ml-2">+91 98765 43210</Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Image
                source={require("@/assets/images/profile-mail.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-md ml-2">example@email.com</Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Image
                source={require("@/assets/images/profile-location.png")}
                className="w-6 h-6"
                resizeMode="contain"
              />
              <Text className="text-md ml-2">Jaipur, Rajasthan, India</Text>
            </View>
          </View>

          {/* Profile-Kids Image Below List Items */}
          <View className="mt-6 flex items-center">
            <Image
              source={require("@/assets/images/profile-kids.png")}
              className="w-[480px] h-[480px]"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
