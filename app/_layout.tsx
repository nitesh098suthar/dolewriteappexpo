import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent" // Sets the status bar background to transparent
        translucent={true} // Allows content to appear under the status bar
        barStyle="light-content" // Optional: Sets the text/icon color (light or dark)
      />
      <Stack>
        <Stack.Screen
          name="course/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="buy/buycourse"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="maintabs"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
