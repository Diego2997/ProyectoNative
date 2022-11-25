import { View, Image, Switch, Text } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useState } from "react";
import t from "../../services/translate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addTask } from "../../services/api";

export default function createNewTask(props) {
  const { navigation } = props;
  const [task, setTask] = useState();
  const [completed, setCompleted] = useState(false);
  const toggleSwitch = () => setCompleted((previousState) => !previousState);

  const handleCreateTask = async () => {
    const token = await AsyncStorage.getItem("token");
    addTask({
      description: task,
      token,
    });
    setTask(null);
    navigation.goBack();
  };
  const handleReturn = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <View style={styles.containerInput}>
          <Input
            onChangeText={setTask}
            placeholder={t("createTask.inputAddTask")}
          />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={completed ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={completed}
          />

          <Text>{t("createTask.text")}</Text>
        </View>
        <ButtonReu
          function={handleCreateTask}
          text={t("createTask.buttonCreateTask")}
        />

        <ButtonReu
          function={handleReturn}
          text={t("createTask.buttonReturn")}
        />
      </View>
    </View>
  );
}
