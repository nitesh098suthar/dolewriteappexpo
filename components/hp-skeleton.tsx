import { View, Text } from "react-native";
import React from "react";
import Skeleton from "./skeleton";

const HomePageSkeleton = () => {
  return (
    <View>
      <Skeleton height={50} />
      <Skeleton height={160} />
      <Skeleton height={160} />
      <Skeleton height={160} />
      <Skeleton height={160} />
    </View>
  );
};

export default HomePageSkeleton;
