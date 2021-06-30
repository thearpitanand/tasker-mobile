import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  View,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// Component
import ToDoItem from "../components/ToDoItem";

// Apollo
import { useQuery, gql, useMutation } from "@apollo/client";

import AsyncStorage from "@react-native-async-storage/async-storage";

const GET_PROJECT = gql`
  query getTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      title
      createdAt
      todos {
        id
        content
        isCompleted
      }
      users {
        id
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createToDo($content: String!, $taskListId: ID!) {
    createToDo(content: $content, taskListId: $taskListId) {
      id
      content
      isCompleted
      taskList {
        id
        progress
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

export default function ToDoScreen() {
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;

  const { data, error, loading } = useQuery(GET_PROJECT, { variables: { id } });

  const [createTodo, { data: createTodoData, error: createTodoError }] =
    useMutation(CREATE_TODO, { refetchQueries: GET_PROJECT });

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert("Error fetching project", error.message);
      AsyncStorage.removeItem("token");
      navigation.navigate("SignIn");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProject(data.getTaskList);
      setTitle(data.getTaskList.title);
    }
  }, [data]);

  const createNewItem = (atIndex: number) => {
    createTodo({
      variables: {
        content: "",
        taskListId: id,
      },
    });
  };

  if (!project) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          value={title}
          onChangeText={setTitle}
          placeholder={"Task List Name"}
          placeholderTextColor="white"
        />
        <FlatList
          data={project.todos}
          renderItem={({ item, index }) => (
            <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
          )}
          style={{ width: "100%" }}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#000000",
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
