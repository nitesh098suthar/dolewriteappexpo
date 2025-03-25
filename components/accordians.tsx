import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  style,
  duration = 500,
}: any) {
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordionItem_${viewKey}`}
      style={[styles.animatedView, bodyStyle, style]}
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={styles.wrapper}
      >
        {children}
      </View>
    </Animated.View>
  );
}

function Item() {
  return (
    <View className="">
      <Text style={{borderWidth:2, borderColor:"red"}}>this is this</Text>
    </View>
  );
}

function Parent({ open }: any) {
  return (
    <View style={styles.parent}>
      <AccordionItem isExpanded={open} viewKey="Accordion">
        <Item />
      </AccordionItem>
    </View>
  );
}

export default function Accordions() {
  const open = useSharedValue(false);
  const onPress = () => {
    open.value = !open.value;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        className="text-2xl"
        style={{ fontWeight: "bold", marginBottom: 12 }}
      >
        FAQs
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPressIn={onPress}
          className="flex-1 justify-between flex-row"
          style={{ backgroundColor: "#F6F6F6", padding: 14, borderRadius: 8 }}
        >
          <Text className="font-semibold text-lg">1. this is this </Text>
          <Image
            source={require("@/assets/icons/chevron.png")}
            style={{ width: 24, height: 24 }}
          />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Parent open={open} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24,
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  parent: {
    width: 200,
  },
  wrapper: {
    width: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
  },
  animatedView: {
    width: "100%",
    overflow: "hidden",
  },
  box: {
    height: 120,
    width: 120,
    color: "#f8f9ff",
    backgroundColor: "#b58df1",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
