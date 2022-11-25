import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  text: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 20,
    marginTop: 20,
  },
  saludo: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 30,
    textTransform: "capitalize",
  },
  itemContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    fontSize: 30,
    height: 60,
    backgroundColor: "green",
    padding: 13,
    width: "90%",
  },
  textItem: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  quickActions: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 50,
    marginRight: 17,
  },
  delete: {
    color: "red",
    fontWeight: "800",
    fontSize: 13,
  },
});
