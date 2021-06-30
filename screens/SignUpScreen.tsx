import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

// Apollo
import { useMutation, gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // mutation[0]: A function to trigger mutation
  // mutation[1]: Result object - { data, error, loading }
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

  if (!!error) {
    Alert.alert("Error signing up. Retry signing in", error.message);
  }

  if (!!data) {
    // save Token
    AsyncStorage.setItem("token", data.signUp.token).then(() => {
      // redirect Home
      return navigation.navigate("Home");
    });
  }
  const onSubmit = () => {
    if (!name) {
      return Alert.alert("Please enter your name");
    } else if (!email) {
      return Alert.alert("Please enter your email");
    } else if (!password) {
      return Alert.alert("Please enter your password");
    }
    signUp({ variables: { name, email, password } });
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Name */}
      <TextInput
        placeholder="Name"
        placeholderTextColor="darkgray"
        value={name}
        onChangeText={setName}
        style={{
          color: "white",
          fontSize: 18,
          width: "100%",
          marginVertical: 25,
        }}
      />
      {/* Email */}
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
      {/* Password */}
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
        disabled={loading}
        onPress={onSubmit}
        style={{
          backgroundColor: "#e33069",
          height: 50,
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 30,
          flexDirection: "row",
        }}
      >
        {!!loading && (
          <ActivityIndicator
            color="white"
            style={{
              paddingVertical: 0,
            }}
          />
        )}
        {!loading && (
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Text>
        )}
      </Pressable>

      {/* Sign Up Button */}

      <Pressable
        disabled={loading}
        onPress={() => navigation.navigate("SignIn")}
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
          Already have an account? Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpScreen;
