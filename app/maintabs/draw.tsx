import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Svg, { Path, Circle } from "react-native-svg";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const COLORS = [
  "black",
  "white",
  "gray",
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "teal",
  "cyan",
  "indigo",
  "lime",
  "maroon",
  "navy",
  "olive",
  "gold",
  "coral",
];

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
  const [eraserPos, setEraserPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { x, y, state } = event.nativeEvent;

    if (isErasing) {
      if (state === State.BEGAN || state === State.ACTIVE) {
        setEraserPos({ x, y });
      } else if (state === State.END) {
        setEraserPos(null);
      }
    }

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
          strokeWidth: isErasing ? 20 : 2,
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
    <GestureHandlerRootView>
      <View className="">
        <Image
          source={require("@/assets/images/bg.png")}
          className="absolute w-full"
          resizeMode="cover"
          alt="linear gradient background with white lines"
        />
        <View className="mt-16 px-5">
          <View
            className="bg-[#FFF2E9] rounded-3xl p-4 mb-4"
            style={{ height: "18%" }}
          >
            <TouchableOpacity
              className="mb-4 px-4 py-1 roun rounded-full"
              style={{ borderWidth: 1, borderColor: "black", width: "100%" }}
              onPress={toggleEraser}
            >
              <Text>{isErasing ? "Eraser On" : "Eraser Off"}</Text>
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row" }}
              className="flex-1 flex-wrap gap-1 justify-between"
            >
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: color,
                      borderWidth:
                        selectedColor === color && !isErasing ? 2 : 0,
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
          </View>

          <View className="mb-4">
            <TouchableOpacity
              className="bg-primary rounded-full"
              onPress={clearCanvas}
            >
              <Text className="text-white px-4 py-2">Clear Canvas</Text>
            </TouchableOpacity>
          </View>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onGestureEvent}
          >
            <View
              className="bg-white rounded-3xl"
              style={{
                height: "70%",
                width: "100%",
                borderColor: "#FFC69E",
                borderWidth: 2,
              }}
            >
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
                    strokeWidth={isErasing ? 20 : 2}
                    fill="none"
                  />
                ) : null}

                {/* Eraser Preview */}
                {isErasing && eraserPos && (
                  <Circle
                    cx={eraserPos.x}
                    cy={eraserPos.y}
                    r={10}
                    stroke="gray"
                    strokeWidth={1}
                    fill="rgba(255,255,255,0.6)"
                  />
                )}
              </Svg>
            </View>
          </PanGestureHandler>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Draw;
