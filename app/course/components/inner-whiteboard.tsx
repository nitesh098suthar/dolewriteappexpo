import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = width * 0.9;

const InnerWhiteboard = () => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const [tempPath, setTempPath] = useState<string>("");

  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  const toggleWhiteboard = () => {
    setShowWhiteboard((prev) => !prev);
  };

  const getSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    let d = `M${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      d += ` Q${points[i].x},${points[i].y} ${midX},${midY}`;
    }
    return d;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
        setTempPath(`M${locationX},${locationY}`);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        currentPoints.current.push({ x: locationX, y: locationY });
        const updatedPath = getSmoothPath(currentPoints.current);
        setTempPath(updatedPath);
      },
      onPanResponderRelease: () => {
        const finalPath = getSmoothPath(currentPoints.current);
        if (finalPath) setPaths((prev) => [...prev, finalPath]);
        currentPoints.current = [];
        setTempPath(""); // clear temporary path
      },
    })
  ).current;

  const clearWhiteboard = () => {
    setPaths([]);
    setTempPath("");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleWhiteboard}>
        <Text style={styles.buttonText}>InnerWhiteboard</Text>
      </TouchableOpacity>

      {showWhiteboard && (
        <View style={styles.whiteboardWrapper}>
          <View
            {...panResponder.panHandlers}
            style={[styles.whiteboard, { width: size, height: size }]}
          >
            <Svg style={StyleSheet.absoluteFill}>
              {/* Permanent paths */}
              {paths.map((d, i) => (
                <Path
                  key={i}
                  d={d}
                  stroke="black"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* Current live path */}
              {tempPath !== "" && (
                <Path
                  d={tempPath}
                  stroke="black"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </Svg>
          </View>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearWhiteboard}
          >
            <Text className="text-primary font-semibold text-md">
              Erase Whiteboard
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default InnerWhiteboard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  whiteboardWrapper: {
    alignItems: "center",
    borderRadius: 10,
  },
  whiteboard: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  clearButton: {
    borderWidth: 2,
    borderColor: "#F97316",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
});
