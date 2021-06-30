import React, { useEffect, useState } from "react";
import { View, Text, Alert, TextInput, Pressable, Modal } from "react-native";

// Import Icons
import { Octicons } from "@expo/vector-icons";

// Import CSS
import styles from "./styles";

// Import Graph QL
import { gql, useMutation } from "@apollo/client";
import { Value } from "react-native-reanimated";

// GraphQL Mutation
import { MY_PROJECTS } from "../../screens/ProjectsScreen";
const CREATE_PROJECT = gql`
  mutation createTaskList($title: String!) {
    createTaskList(title: $title) {
      id
      title
      createdAt
    }
  }
`;
interface CreateTaskListPopUpProps {
  value: boolean;
  flipValue: () => void;
}

const CreateTaskListPopUp = (props: CreateTaskListPopUpProps) => {
  const { value, flipValue } = props;
  const [title, setTitle] = useState("");
  const [errorMassage, setErrorMassage] = useState("");

  const [createTaskList, { data, error, loading }] = useMutation(
    CREATE_PROJECT,
    { refetchQueries: MY_PROJECTS }
  );

  useEffect(() => {
    if (!!error) {
      Alert.alert("Error fetching projects", error.message);
    }
  }, [error]);

  const createTaskListButtonPressed = () => {
    if (!title) {
      return setErrorMassage("Invalid Task List Name!!");
    }
    flipValue();
    createTaskList({ variables: { title } });
  };

  return (
    <Modal visible={value} transparent={true}>
      <View style={styles.body}>
        <View style={styles.modelView}>
          <View style={styles.inputContainer}>
            <Octicons
              name="tasklist"
              size={20}
              color="black"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Enter new task list name"
              placeholderTextColor="darkgray"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
          </View>
          <Text>{errorMassage}</Text>
          <Pressable
            style={styles.button}
            onPress={createTaskListButtonPressed}
          >
            <Text style={styles.textStyle}>Create Task List</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CreateTaskListPopUp;
