import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
// Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import CSS
import styles from "./styles";

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ToDoScreen", { id: project.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="file-document-edit-outline"
          size={24}
          color="gray"
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.time}>{project.createdAt}</Text>
      </View>
    </Pressable>
  );
};

export default ProjectItem;
