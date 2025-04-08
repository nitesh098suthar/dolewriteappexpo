import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Get screen dimensions for better scaling (optional)
const { width, height } = Dimensions.get("window");

const Draw = () => {
  // Store all drawn paths
  const [paths, setPaths] = useState<string[]>([]);
  // Store the current path being drawn
  const [currentPath, setCurrentPath] = useState<string>("");
  // Store the starting point of the gesture
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  // Handle gesture events
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;

    if (state === State.BEGAN) {
      setCurrentPath(`M${x},${y}`);
    } else if (state === State.ACTIVE) {
      setCurrentPath((prev) => `${prev} L${x},${y}`);
    } else if (state === State.END) {
      setPaths((prev) => [...prev, currentPath]);
      setCurrentPath("");
    }
  };

  // Clear the canvas
  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath("");
    setStartX(0);
    setStartY(0);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Draw Here</Text>
        {/* Drawing Area */}
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onGestureEvent}
        >
          <View style={styles.canvas}>
            <Svg height="100%" width="100%">
              {/* Render all completed paths */}
              {paths.map((path, index) => (
                <Path
                  key={index}
                  d={path}
                  stroke="black"
                  strokeWidth={2}
                  fill="none"
                />
              ))}
              {/* Render the current path being drawn */}
              {currentPath ? (
                <Path
                  d={currentPath}
                  stroke="black"
                  strokeWidth={2}
                  fill="none"
                />
              ) : null}
            </Svg>
          </View>
        </PanGestureHandler>

        {/* Clear Button */}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  canvas: {
    width: "90%",
    height: "80%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    // Ensure the canvas has a defined position context
    position: "relative",
  },
});

export default Draw;
