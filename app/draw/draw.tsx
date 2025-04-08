import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

// Define some color options
const COLORS = ["black", "red", "blue", "green", "orange", "purple"];

type DrawnPath = {
  d: string;
  color: string;
};

const Draw = () => {
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("black");

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;

    if (state === State.BEGAN) {
      setCurrentPath(`M${x},${y}`);
    } else if (state === State.ACTIVE) {
      setCurrentPath((prev) => `${prev} L${x},${y}`);
    } else if (state === State.END) {
      setPaths((prev) => [...prev, { d: currentPath, color: selectedColor }]);
      setCurrentPath("");
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath("");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Draw Here</Text>

        {/* Color Picker */}
        <View style={styles.colorPicker}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                {
                  backgroundColor: color,
                  borderWidth: selectedColor === color ? 2 : 0,
                  borderColor: "#000",
                },
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        {/* Drawing Area */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
        >
          <View style={styles.canvas}>
            <Svg height="100%" width="100%">
              {paths.map((pathObj, index) => (
                <Path
                  key={index}
                  d={pathObj.d}
                  stroke={pathObj.color}
                  strokeWidth={2}
                  fill="none"
                />
              ))}
              {currentPath ? (
                <Path
                  d={currentPath}
                  stroke={selectedColor}
                  strokeWidth={2}
                  fill="none"
                />
              ) : null}
            </Svg>
          </View>
        </PanGestureHandler>

        <Button title="Clear Canvas" onPress={clearCanvas} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  colorPicker: {
    flexDirection: "row",
    marginBottom: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  canvas: {
    width: "90%",
    height: "75%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
  },
});

export default Draw;
