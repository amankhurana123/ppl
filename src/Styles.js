import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffa33c",
    width: "100%",
    justifyContent: "space-around",
    flex: 1
  },
  viewText: { flex: 2 / 3 },

  text: {
    fontSize: 28,
    alignSelf: "center",
    color: "white"
  },
  viewInput: {
    flex: 1 / 4
  },
  textInput: {
    color: "white",
    width: "80%",
    alignSelf: "center"
  },
  forgotPasswordText: {
    color: "white",
    width: "80%",
    alignSelf: "center"
  },
  errorStyle: {
    color: "red",
    width: "80%",
    alignSelf: "center",
    fontSize: 12
  },

  button: {
    width: "80%",
    alignSelf: "center",
    marginTop: 15
  }
});
