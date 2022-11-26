import { View, Image, Switch, Text } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { styles } from "../createNewTask/styles";
import Input from "../../components/input/Input";
import { useState, useEffect } from "react";
import t from "../../services/translate";
import { GetTaskID, updateTask } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditTask(props) {
  const { navigation } = props;
  const [editableTask, setEditableTask] = useState("");
  const [completed, setCompleted] = useState(false);
  const [idTask, setIdTask] = useState("");
  const toggleSwitch = () => setCompleted((previousState) => !previousState);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      updateTask({
        _id: idTask,
        description: editableTask,
        completed: completed,
        token: token,
      });
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturn = () => {
    navigation.navigate("Home");
  };

  const getTaskEditable = async () => {
    try {
      const idTarea = await AsyncStorage.getItem("idTarea");
      const token = await AsyncStorage.getItem("token");
      GetTaskID({
        _id: idTarea,
        token,
        setEditableTask: setEditableTask,
        setCompleted: setCompleted,
        setIdTask: setIdTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTaskEditable();
  }, []);

  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <View style={styles.containerInput}>
          <Input
            onChangeText={setEditableTask}
            text={editableTask}
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
        <ButtonReu function={handleUpdate} text={t("editTask.inputEdit")} />

        <ButtonReu function={handleReturn} text={t("editTask.buttonReturn")} />
      </View>
    </View>
  );
}
