import { View, Text, Image } from "react-native";
import React from "react";
import Input from "../../components/input/Input";
import { styles } from "./styles";
import ButtonReu from "../../components/button/ButtonReu";

export default function Login(props) {
  const { navigation } = props;

  const goToPage = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={require("../../assets/elipse.png")}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.welcome}>Welcome Back!</Text>
          <Image
            source={require("../../assets/login.png")}
            style={styles.imageLogin}
          />
        </View>
        <View style={styles.containerInput}>
          <Input placeholder="Enter your e-mail" />
          <Input placeholder="Enter password" />
          <Text style={styles.textLogin}>Forget Password</Text>
        </View>
        <ButtonReu text="Log In" />
        <Text style={styles.text}>
          Don't have an account?
          <Text style={styles.textLogin} onPress={goToPage}>
            {" "}
            Sign Up
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
}
