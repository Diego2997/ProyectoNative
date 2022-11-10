import { NavigationContainer } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function ButtonReu(props) {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}
