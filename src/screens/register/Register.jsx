import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles.js";
import Input from "../../components/input/Input.js";
import ButtonReu from "../../components/button/ButtonReu.js";

export default function Register(props) {
  const { navigation } = props;

  const goToPage = () => {
    navigation.navigate("Login");
  };
  return (
    <>
      <View style={styles.container2}>
        <Image
          source={require("../../assets/elipse.png")}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.welcome}>Welcome OnBoard!</Text>
          <Text>Let's help you meet up your tasks</Text>
        </View>
        <View style={styles.containerInput}>
          <Input placeholder="Enter your full name" />
          <Input placeholder="Enter your e-mail" />
          <Input placeholder="Enter password" />
          <Input placeholder="Confirm password" />
        </View>
        <ButtonReu text="Register" />
        <Text style={styles.text}>
          Already have an account?
          <Text style={styles.textLogin} onPress={goToPage}>
            {" "}
            Sign In
          </Text>{" "}
        </Text>
      </View>
    </>
  );
}
