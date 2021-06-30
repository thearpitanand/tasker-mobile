import React, { useEffect, useState, useRef } from "react";
import { View, TextInput } from "react-native";

// Component
import Checkbox from "../Checkbox";

// Apollo
import { gql, useMutation } from "@apollo/client";

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      id
      content
      isCompleted

      taskList {
        title
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

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState("");

  const [updateItem] = useMutation(UPDATE_TODO);

  const input = useRef(null);

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    //   Get Focus On Input
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const callUpdateItem = () => {
    updateItem({
      variables: {
        id: todo.id,
        content,
        isCompleted: isChecked,
      },
    });
  };

  const onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && content === "") {
      // Delete Item
      console.warn("Deleted");
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 3,
      }}
    >
      {/* Checkbox */}
      <Checkbox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
          callUpdateItem();
        }}
      />
      {/* Text Input */}
      <TextInput
        ref={input}
        value={content}
        onChangeText={setContent}
        style={{
          flex: 1,
          color: "white",
          fontSize: 16,
          marginLeft: 12,
        }}
        multiline
        onEndEditing={callUpdateItem}
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export default ToDoItem;
