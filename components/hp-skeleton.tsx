import { View, Text } from "react-native";
import React from "react";
import Skeleton from "./skeleton";

const HomePageSkeleton = ({ onlyCards }: { onlyCards: boolean }) => {
  return (
    <View>
      {onlyCards === true && <Skeleton height={40} />}
      <Skeleton height={158} />
      <Skeleton height={158} />
      <Skeleton height={158} />
      <Skeleton height={158} />
    </View>
  );
};

export default HomePageSkeleton;
