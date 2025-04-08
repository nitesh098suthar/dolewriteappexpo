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
  strokeWidth: number;
};

const Draw = () => {
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;

    if (state === State.BEGAN) {
      setCurrentPath(`M${x},${y}`);
    } else if (state === State.ACTIVE) {
      setCurrentPath((prev) => `${prev} L${x},${y}`);
    } else if (state === State.END) {
      setPaths((prev) => [
        ...prev,
        {
          d: currentPath,
          color: isErasing ? "#fff" : selectedColor,
          strokeWidth: isErasing ? 10 : 2,
        },
      ]);
      setCurrentPath("");
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath("");
  };

  const toggleEraser = () => {
    setIsErasing((prev) => !prev);
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
                  borderWidth: selectedColor === color && !isErasing ? 2 : 0,
                  borderColor: "#000",
                },
              ]}
              onPress={() => {
                setSelectedColor(color);
                setIsErasing(false);
              }}
            />
          ))}
        </View>

        {/* Eraser Toggle */}
        <TouchableOpacity
          style={[styles.eraserButton, isErasing && styles.eraserActive]}
          onPress={toggleEraser}
        >
          <Text style={styles.eraserText}>{isErasing ? "Eraser On" : "Eraser Off"}</Text>
        </TouchableOpacity>

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
                  strokeWidth={pathObj.strokeWidth}
                  fill="none"
                />
              ))}
              {currentPath ? (
                <Path
                  d={currentPath}
                  stroke={isErasing ? "#fff" : selectedColor}
                  strokeWidth={isErasing ? 10 : 2}
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
  eraserButton: {
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ddd",
    borderRadius: 6,
  },
  eraserActive: {
    backgroundColor: "#bbb",
  },
  eraserText: {
    fontWeight: "bold",
    color: "#333",
  },
  canvas: {
    width: "90%",
    height: "70%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
  },
});

export default Draw;
