import { View, Image, Switch } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { styles } from "./styles";
import Input from "../../components/input/Input";

export default function createNewTask() {
  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <Input placeholder="Add Task" />
        <Switch />
        <Text>Completed</Text>
        <ButtonReu text="Create New Task" />
        <ButtonReu text="Return" />
      </View>
    </View>
  );
}
