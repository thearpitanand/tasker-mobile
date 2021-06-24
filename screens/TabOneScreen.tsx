import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { View } from "../components/Themed";

// Component
import ToDoItem from "../components/ToDoItem";

export default function TabOneScreen() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([
    {
      id: "1",
      content: "Arpit Anand",
      isCompleted: false,
    },
    {
      id: "2",
      content: "Arpit Anand Second",
      isCompleted: false,
    },
    {
      id: "3",
      content: "Lets Go",
      isCompleted: true,
    },
    {
      id: "4",
      content: "Lets rock",
      isCompleted: false,
    },
  ]);

  const createNewItem = (atIndex: number) => {
    const newToDos = [...todos];
    newToDos.splice(atIndex, 0, {
      id: (atIndex + 1).toString(),
      content: "",
      isCompleted: false,
    });
    setTodos(newToDos);
  };

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
          data={todos}
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
  },
  title: {
    width: "100%",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
