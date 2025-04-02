import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import axios, { AxiosError } from "axios";
import { httpClient } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginId, setLoginId] = useState<string | undefined>(undefined);
  const [loginPassword, setLoginPassword] = useState<string | undefined>(
    undefined
  );
  const [err, setErr] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const credentialsString = await AsyncStorage.getItem("userCredentials");
        if (credentialsString) {
          const credentials = JSON.parse(credentialsString);
          const { id, password } = credentials;

          const response = await httpClient.post("/user/validate", {
            id,
            password,
          });

          if (response.data.valid) {
            router.replace("/maintabs/home");
          } else {
            setLoading(false); // Set loading to false only if not logged in
          }
        } else {
          setLoading(false); // Set loading to false only if not logged in
        }
      } catch (error) {
        console.error("Login check error:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    checkLoggedIn();
  }, []);

  const loginHandler = async () => {
    setErr("");
    setLoading(true); //start loading when login handler is called.
    if (!loginId || !loginPassword) {
      Alert.alert("Error", "Please enter ID and Password.");
      setLoading(false); //stop loading if there is an error.
      return;
    }
    try {
      const response = await httpClient.post("/user/loginapp", {
        id: loginId,
        password: loginPassword,
      });
      await AsyncStorage.setItem(
        "userCredentials",
        JSON.stringify({
          id: loginId,
          password: loginPassword,
        })
      );
      console.log(response, "------------res");
      router.replace("/maintabs/home");
    } catch (error: any) {
      console.log("error::::::::", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setErr("Wrong Credentials");
        console.log("FAILED loggedin");
        console.log("Error response:", axiosError);
      } else {
        Alert.alert("Login Error", "An unexpected error occurred");
      }
      setLoading(false); // stop loading if login fails.
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Image
        source={require("@/assets/images/login-logo.png")}
        className="w-32 h-32 mb-6"
        resizeMode="contain"
      />

      <TextInput
        placeholder="Name"
        className="w-full rounded-lg p-3 mb-4 bg-[#F6F7FA]"
        onChangeText={(e) => setLoginId(e)}
      />

      <View className="w-full rounded-lg flex-row items-center bg-[#F6F7FA]">
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          className="flex-1 p-3"
          onChangeText={(e) => setLoginPassword(e)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Image
            source={require("@/assets/images/login-hide.png")}
            className="w-5 h-5 mr-4"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {err && (
        <View style={{ width: "100%" }}>
          <Text className="text-sm text-red-600 pt-2 pl-2">
            Wrong Credentials
          </Text>
        </View>
      )}
      <TouchableOpacity
        className="bg-[#F97316] w-full py-3 rounded-lg mb-4 items-center mt-6"
        onPress={loginHandler}
      >
        <Text className="text-white font-bold">Login</Text>
      </TouchableOpacity>

      <View className="flex-row items-center w-full my-4">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="px-3 text-gray-500">or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <TouchableOpacity>
        <Text className="mb-14">
          <Text className="text-[#9D9FA0]">Don't have an account? </Text>
          <Text className="text-[#F97316] font-bold">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
