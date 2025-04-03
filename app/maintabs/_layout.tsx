import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#F97316",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 12,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#F97316",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "course",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Course"} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "about",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"About"} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Profile"} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const TabIcon = ({ focused, title }: any) => {
  const iconMap: any = {
    Home: require("@/assets/icons/home.png"),
    Profile: require("@/assets/icons/person.png"),
    About: require("@/assets/icons/about.png"),
    Course: require("@/assets/icons/course.png"),
  };

  const iconSource: any = iconMap[title];

  if (focused) {
    return (
      <>
        <View
          // source={require("@/assets/images/highlight.png")}
          className="flex-1 justify-center items-center min-h-16 rounded-full min-w-[112px] mt-4 overflow-hidden bg-white"
          style={{ flexDirection: "row" }}
        >
          <Image source={iconSource} tintColor={"#F97316"} className="" />
          <Text className="text-primary text-base font-semibold ml-2">
            {title}
          </Text>
        </View>
      </>
    );
  }
  return (
    <>
      <View className="flex-1 justify-center items-center min-h-16 rounded-full min-w-[112px] mt-4 overflow-hidden">
        <Image source={iconSource} tintColor={"white"} className="size-5" />
        {/* <Text className="text-[#A8B5DB]">{title}</Text> */}
      </View>
    </>
  );
};
