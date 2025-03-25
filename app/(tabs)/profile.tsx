import { View, Text, ScrollView, Image } from "react-native";
import React from "react";

interface ProfileInfoProps {
  label: string;
  value?: string | number | null;
}

const ProfileInfo = ({ label, value }: ProfileInfoProps) => (
  <View
    className="flex-col w-full items-center justify-center mt-5"
    style={{ paddingHorizontal: 40 }}
  >
    <Text
      style={{ textAlign: "center" }}
      className="text-black font-normal text-sm"
    >
      {label}
    </Text>
    <Text
      style={{ textAlign: "center" }}
      className="text-black font-bold text-sm mt-2"
    >
      {value || "N/A"}
    </Text>
  </View>
);

const Profile = () => {
  // Static profile data
  const profile = {
    avatar: "https://example.com/avatar.jpg", // Replace with a real image URL or local asset
    name: "Nitesh Kumar Suthar",
    username: "@nitesh098suthar",
    joinDate: "2020-05-15",
    bio: "A passionate developer and movie enthusiast. Lover of sci-fi and popcorn.",
    location: "Jaipur, INDIA",
    followers: 1200,
    following: 350,
    interests: ["Coding", "Movies", "Gaming", "Travel"],
  };

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        {/* Profile Avatar */}
        <View className="flex-1 items-center justify-center mt-20">
          <View
            style={{
              backgroundColor: "#0f0d23",
              height: 160,
              width: 160,
              borderRadius: "50%",
              borderColor: "black",
              borderWidth: 1,
            }}
            className="flex-1 items-center justify-center"
          >
            <Image
              source={require("@/assets/icons/person.png")} // Use a real URL or require() for local asset
              resizeMode="cover"
              className="size-40"
            />
          </View>
        </View>
        <View className="flex-1 items-start justify-center mt-5 px-5">
          {/* Name and Username */}
          <Text
            className="text-black font-bold text-xl w-full mx-auto"
            style={{ textAlign: "center" }}
          >
            {profile.name}
          </Text>
          <View
            className="flex-1 justify-center flex-row items-center gap-x-1 mt-2"
            style={{ width: "100%" }}
          >
            <Text className="text-black text-sm">{profile.username}</Text>
            <Text className="text-black text-sm">
              Joined {new Date(profile.joinDate).getFullYear()}
            </Text>
          </View>

          {/* Followers/Following Stats */}
          <View className="flex-1 items-center justify-center w-full">
            <View
              className="flex-row items-center justify-center mt-2"
              style={{
                borderWidth: 1,
                borderColor: "",
                width: "50%",

                backgroundColor: "#0f0d23",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 8,
              }}
            >
              <Text className="text-black font-bold" style={{ marginRight: 6 }}>
                {profile.followers}
              </Text>
              <Text className="text-black text-sm">Followers</Text>
              <Text className="text-black text-sm mx-2">{"  "}</Text>
              <Text className="text-black font-bold" style={{ marginRight: 6 }}>
                {profile.following}
              </Text>
              <Text className="text-black text-sm">Following</Text>
            </View>
          </View>

          {/* Bio */}
          <ProfileInfo label="Bio" value={profile.bio} />

          {/* Location */}
          <ProfileInfo label="Location" value={profile.location} />

          {/* Interests */}
          <ProfileInfo
            label="Interests"
            value={profile.interests.join(" - ") || "N/A"}
          />
        </View>
        {/* Profile Details */}
      </ScrollView>
    </View>
  );
};

export default Profile;
