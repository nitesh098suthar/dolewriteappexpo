import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
interface ProfileInfoProps {
  label: string;
  value?: string | number | null;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View
    className=" flex-col w-full items-center justify-center "
    style={{ paddingHorizontal: 40 }}
  >
    <View
      className="my-8"
      style={{ backgroundColor: "#F6F6F6", width: "100%", height: 1 }}
    ></View>
    <Text
      style={{ textAlign: "center" }}
      className="text-black font-bold text-2xl "
    >
      {label}
    </Text>
    <Text
      style={{ textAlign: "center" }}
      className="text-black font-normal text-xl "
    >
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
    <View className="bg-white flex-1">
      <Image
        source={require("@/assets/images/bg.png")}
        className="z-0 absolute w-full"
        resizeMode="cover"
        alt="backgound line image"
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="flex-1 items-center justify-center mt-20">
          <Text className="text-4xl font-bold my-8">My Profile</Text>
          <View
            style={{
              backgroundColor: "#0f0d23",
              height: 160,
              width: 160,
              borderRadius: "50%",
              borderColor: "#F6F6F6",
              borderWidth: 2,
            }}
            className="flex-1 items-center justify-center overflow-hidden"
          >
            <Image
              source={require("@/assets/images/girl.jpg")} // Use a real URL or require() for local asset
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
        </View>
        <View className="flex-1 items-start justify-center mt-5 px-5">
          <Text
            className="font-bold text-2xl"
            style={{
              textAlign: "center",
              width: "100%",
              marginHorizontal: "auto",
            }}
          >
            Subscription Active
          </Text>
          <ProfileInfo label="Your ID" value={profile.id} />
          <ProfileInfo label="School Name" value={profile.schoolname} />
          <ProfileInfo label="Account Type" value={profile.accountType} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
