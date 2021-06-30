import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Alert,
  Text,
  Pressable,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// Component
import ProjectItem from "../components/ProjectItem";
import CreateTaskListPopUp from "../components/CreateTaskListPopUp";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Apollo
import { useQuery, gql } from "@apollo/client";

// Storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MY_PROJECTS = gql`
  query myTaskList {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;

export default function ProjectsScreen() {
  const navigation = useNavigation();
  const [project, setProject] = useState([]);
  const [createTaskListButton, setCreateTaskListButton] = useState(false);

  const { data, error, loading } = useQuery(MY_PROJECTS);

  useEffect(() => {
    if (!!error) {
      Alert.alert("Error fetching projects", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (!!data) {
      // console.log(data.myTaskLists);
      setProject(data.myTaskLists);
    }
  }, [data]);

  const signOut = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("SignIn");
  };

  const createNewTaskList = () => {
    setCreateTaskListButton(!createTaskListButton);
  };

  return (
    <SafeAreaView style={styles.safeViewContainer}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FlatList
            data={project}
            renderItem={({ item }) => <ProjectItem project={item} />}
            keyExtractor={(item) => item.id}
            style={{ width: "100%" }}
          />
        </ScrollView>
        <CreateTaskListPopUp
          value={createTaskListButton}
          flipValue={createNewTaskList}
        />
        <Pressable
          onPress={createNewTaskList}
          style={styles.createNewTaskListButton}
        >
          <AntDesign
            style={styles.createNewTaskListButtonPlusIcon}
            name="pluscircleo"
            size={20}
            color="darkgray"
          />
          <Text style={styles.createNewTaskListButtonText}>
            Create New Task List
          </Text>
        </Pressable>
        <Pressable onPress={signOut} style={styles.logOutButton}>
          <Text style={styles.logOutButtonText}>SignOut</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeViewContainer: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
    width: "100%",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
  },
  createNewTaskListButton: {
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    display: "flex",
    flexDirection: "row",
  },
  createNewTaskListButtonPlusIcon: {
    marginRight: 10,
  },
  createNewTaskListButtonText: {
    color: "darkgray",
    fontSize: 20,
  },
  logOutButton: {
    backgroundColor: "#e33069",
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "40%",
  },
  logOutButtonText: {
    color: "#ffffff",
    fontSize: 20,
    // fontWeight: "bold",
  },
});
