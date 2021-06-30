import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useMutation, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // mutation[0]: A function to trigger mutation
  // mutation[1]: Result object - { data, error, loading }
  const [SignIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if (!!error) {
      Alert.alert("Invalid credentials. Try again", error.message);
    }
  }, [error]);

  if (!!data) {
    // save Token
    AsyncStorage.setItem("token", data.signIn.token).then(() => {
      // redirect Home
      return navigation.navigate("Home");
    });
  }

  const onSubmit = () => {
    if (!email) {
      return Alert.alert("Please enter your email");
    } else if (!password) {
      return Alert.alert("Please enter your password");
    }
    SignIn({ variables: { email, password } });
  };
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="darkgray"
        value={email}
        onChangeText={setEmail}
        style={styles.viewBox}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="darkgray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.viewBox}
      />
      {/* Sign In Button */}
      <Pressable
        disabled={loading}
        onPress={onSubmit}
        style={styles.signInButton}
      >
        {!!loading && (
          <ActivityIndicator color="white" style={styles.signInButtonLoading} />
        )}
        {!loading && <Text style={styles.signInButtonText}>Sign In</Text>}
      </Pressable>
      {/* Sign Up Button */}
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>New hear? Sign up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewBox: {
    color: "white",
    fontSize: 18,
    width: "100%",
    marginVertical: 25,
  },
  signInButton: {
    backgroundColor: "#e33069",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  signInButtonLoading: {
    paddingVertical: 0,
  },
  signInButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpButton: {
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#e33069",
    fontSize: 18,
  },
});

export default SignInScreen;
