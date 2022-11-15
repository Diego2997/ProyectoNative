import { TextInput } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function Input(props) {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={styles.input}
      onChangeText={props.function}
      onFocus={props.onFocus}
    />
  );
}
