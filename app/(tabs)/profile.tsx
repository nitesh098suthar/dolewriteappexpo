import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

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
  const profile = {
    id: "2342343",
    schoolname: "School of the master card, Jaipur",
    accountType: "Owner",
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
                <Image
                  source={require("@/assets/images/profile-spiral.png")}
                  className="absolute top-8 right-10 w-7 h-7"
                  resizeMode="contain"
                />
                <Image
                  source={require("@/assets/images/profile-big.png")}
                  className="absolute top-10 left-2 w-24 h-24"
                  resizeMode="contain"
                />
                <Image
                  source={require("@/assets/images/profile-small.png")}
                  className="absolute top-64 left-4 w-14 h-14"
                  resizeMode="contain"
                />

                <Text className="text-white text-3xl font-bold mt-6 mb-6 text-center">
                  My Profile
                </Text>
                <View className="relative w-40 h-40 mb-6">
                  <Image
                    source={require("@/assets/images/profile-kitty.png")}
                    className="w-full h-full rounded-full"
                    resizeMode="contain"
                  />
                  <Image
                    source={require("@/assets/images/profile-plus.png")}
                    className="absolute w-4 h-4 right-[-20px] top-10"
                    resizeMode="contain"
                  />
                  <Image
                    source={require("@/assets/images/profile-plus.png")}
                    className="absolute w-4 h-4 right-[-72px] top-52"
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
                <TouchableOpacity className="mt-6 w-full">
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
      </ScrollView>
    </View>
  );
};

export default Profile;
