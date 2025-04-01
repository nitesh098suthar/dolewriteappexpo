import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import { httpClient } from "@/services/api";

const Login = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginId, setLoginId] = useState<string>();
  const [loginPassword, setLoginPassword] = useState<string>();
  const [err, setErr] = useState<string>(""); // Initialize err to an empty string

  const loginHandler = async () => {
    setErr(""); // Reset error state before each login attempt
    console.log("loginId: ", loginId);
    console.log("loginPassword: ", loginPassword);

    try {
      const response = await httpClient.post("/user/login", {
        id: loginId,
        password: loginPassword,
      });

      console.log("SUCCESS loggedin");
      console.log("Response data:", response.data); // Log the response data
      return router.navigate("/");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setErr("Wrong Credentials");
        console.log("FAILED loggedin");
        console.log("Error response:", error.response); // Log the error response
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  };

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
