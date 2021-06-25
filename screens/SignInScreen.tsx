import React, { useState } from "react";

import { View, Text, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const onSubmit = () => {};
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="darkgray"
        value={email}
        onChangeText={setEmail}
        style={{
          color: "white",
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="darkgray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          color: "white",
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />
      {/* Sign In Button */}
      <Pressable
        onPress={onSubmit}
        style={{
          backgroundColor: "#e33069",
          height: 50,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Sign In
        </Text>
      </Pressable>
      {/* Sign Up Button */}
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{
          height: 50,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#e33069",
            fontSize: 18,
          }}
        >
          New hear? Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInScreen;
