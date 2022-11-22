import { TextInput } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function Input({
  placeholder,
  onChangeText,
  onFocus,
  secureTextEntry,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      onChangeText={(value) => onChangeText(value)}
      onFocus={onFocus}
      secureTextEntry={secureTextEntry ? true : null}
    />
  );
}
