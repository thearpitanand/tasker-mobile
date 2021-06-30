import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkUser = async () => {
      if (await isAuthenticated()) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("SignIn");
      }
    };
    checkUser();
  }, []);
  const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem("token");
    return !!token;
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color="white" />
    </View>
  );
};

export default SplashScreen;
