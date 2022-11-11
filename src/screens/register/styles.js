import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#50C2C9",
  },
  container2: {
    backgroundColor: "#EDEDEE",
    width: "90%",
    height: "95%",
    marginHorizontal: 20,
    marginVertical: 20,
    flexDirection: "column",
  },
  image: {
    marginHorizontal: -120,
    marginVertical: -100,
    position: "relative",
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  welcome: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 20,
  },

  containerButton: {
    flexDirection: "column",
    marginTop: 50,
    fontSize: 30,
  },

  text: {
    marginTop: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  containerInput: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 45,
    marginBottom: 45,
  },
  textLogin: {
    color: "#50C2C9",
    marginBottom: 20,
    marginTop: 50,
    fontWeight: "500",
  },
});
