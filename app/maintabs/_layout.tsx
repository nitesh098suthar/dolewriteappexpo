import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

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
          marginHorizontal: 18,
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
        name="draw"
        options={{
          title: "draw",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title={"Draw"} />
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
    Draw: require("@/assets/icons/draw.png"),
  };

  const iconSource: any = iconMap[title];

  return (
    <View
      className={`flex-1 justify-center items-center min-h-16 rounded-full mt-4 ${
        focused ? "bg-white min-w-[68px]" : "min-w-[68px]"
      }`}
    >
      <Image
        source={iconSource}
        tintColor={focused ? "#F97316" : "white"}
        style={{ width: 18, height: 18 }}
        resizeMode="contain"
      />
    </View>
  );
};
