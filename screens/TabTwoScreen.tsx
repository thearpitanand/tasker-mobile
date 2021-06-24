import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import { View } from "../components/Themed";

// Component
import ProjectItem from "../components/ProjectItem";

export default function TabTwoScreen() {
  const [project, setProject] = useState([
    {
      id: "1",
      title: "Hello World 1",
      createdAt: "1 Days",
    },
    {
      id: "2",
      title: "Hello World 2",
      createdAt: "2 Days",
    },
    {
      id: "3",
      title: "Hello World 3",
      createdAt: "3 Days",
    },
  ]);
  return (
    <View style={styles.container}>
      <FlatList
        data={project}
        renderItem={({ item }) => <ProjectItem project={item} />}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
