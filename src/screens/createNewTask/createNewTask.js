import { View, Image, Switch, Text } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { styles } from "./styles";
import Input from "../../components/input/Input";
import { useState } from "react";
import t from "../../services/translate";

export default function createNewTask() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <View style={styles.containerInput}>
          <Input placeholder={t("createTask.inputAddTask")} />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>{t("createTask.text")}</Text>
        </View>
        <ButtonReu text={t("createTask.buttonCreateTask")} />
        <ButtonReu text={t("createTask.buttonReturn")} />
      </View>
    </View>
  );
}
