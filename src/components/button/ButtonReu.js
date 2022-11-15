import { View, Text, TouchableOpacity, Button } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function ButtonReu(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.function}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}
