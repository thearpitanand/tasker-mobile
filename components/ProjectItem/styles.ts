import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
  },
  iconContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#404040",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
    marginRight: 5,
  },
  time: {
    color: "darkgray",
  },
});

export default styles;
