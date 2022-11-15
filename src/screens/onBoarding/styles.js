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
    marginHorizontal: -90,
    marginVertical: -90,
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
    marginTop: 40,
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
    textAlign: "center",
    marginBottom: 100,
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageLogin: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  button: {
    backgroundColor: "#50c2c9",
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  textButton: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
