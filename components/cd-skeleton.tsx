import { View, Text, Image } from "react-native";
import React from "react";
import Skeleton from "./skeleton";

const CourseDetailSkeleton = () => {
  return (
    <View className="">
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
      <Skeleton height={40} />
    </View>
  );
};

export default CourseDetailSkeleton;
