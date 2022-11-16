import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Input from "../../components/input/Input";
import { styles } from "./styles";
import ButtonReu from "../../components/button/ButtonReu";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

export default function Login(props) {
  const { navigation } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);

  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const submit = async () => {
    try {
      setIsloading(true);
      const request = await axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );
      const { name } = request.data.user;
      const { token } = request.data;
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("token", token);
      showMessage({
        message: "Te has logueado correctamente",
        type: "info",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      });
      navigation.navigate("Home");
    } catch (error) {
      showMessage({
        message: "Hubo un error al loguearse",
        type: "warning",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      });
    }
    setIsloading(false);
  };

  return (
    <View style={styles.container2}>
      <Image source={require("../../assets/elipse.png")} style={styles.image} />
      <View style={styles.containerText}>
        <Text style={styles.welcome}>Welcome Back!</Text>
        <Image
          source={require("../../assets/login.png")}
          style={styles.imageLogin}
        />
      </View>
      <View style={styles.containerInput}>
        <Input
          value={email}
          placeholder="Enter your e-mail"
          function={handleEmail}
        />
        <Input
          value={password}
          placeholder="Enter password"
          function={handlePassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={() => {
            showMessage({
              message:
                "Hemos enviado por email las instrucciones para reestablecer su contraseña.",
              type: "info",
              duration: 2500,
              backgroundColor: "#50C2C9",
              position: "bottom",
            });
          }}
        >
          <Text style={styles.textLogin}>Forget Password</Text>
        </TouchableOpacity>
      </View>
      {isloading ? (
        <ActivityIndicator size="large" color="#50C2C9" />
      ) : (
        <ButtonReu text="Log In" function={submit} />
      )}
      <Text style={styles.text}>
        Don't have an account?
        <Text
          style={styles.textLogin}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          Sign Up
        </Text>{" "}
      </Text>
    </View>
  );
}
