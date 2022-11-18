import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles.js";
import Input from "../../components/input/Input.js";
import ButtonReu from "../../components/button/ButtonReu.js";
import { useState } from "react";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import t from "../../services/translate";

export default function Register(props) {
  const { navigation } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passordConfirm, setPassordConfirm] = useState("");
  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);

  const validateNam = (text) => {
    setName(text);
    if (text.length >= 7 && name !== "") {
      setValidateName(true);
    } else {
      setValidateName(false);
    }
  };

  const validateMail = (text) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmail(text);
    if (emailRegex.test(text) && email !== "") {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const handleConfirmPassword = (text) => {
    setPassordConfirm(text);
  };

  const submit = async () => {
    if (validateName && validateEmail && password === passordConfirm) {
      const request = await axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/register",
        {
          email,
          password,
          name,
        }
      );

      const { token } = request.data;
      await AsyncStorage.setItem("token", token);
      showMessage({
        message: "Te has registrado correctamente",
        type: "info",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      });
      setName("");
      setEmail("");
      setPassword("");
      setPassordConfirm("");
      navigation.navigate("Home");
    } else {
      showMessage({
        message: "Hubo un error al registrarse",
        type: "warning",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      });
    }
  };
  return (
    <>
      <View style={{ backgroundColor: "#EDEDEE" }}>
        <View style={styles.container2}>
          <Image
            source={require("../../assets/elipse.png")}
            style={styles.image}
          />
          <View style={styles.containerText}>
            <Text style={styles.welcome}>{t("register.welcome")}</Text>
            <Text>{t("register.subtitle")}</Text>
          </View>
          <View style={styles.containerInput}>
            <Input
              placeholder={t("register.inputName")}
              function={validateNam}
              onFocus={() => {
                showMessage({
                  message: "Debe ingresar un nombre de más de 7 caracteres",
                  type: "warning",
                  duration: 2500,
                  backgroundColor: "#50C2C9",
                  position: "top",
                });
              }}
            />
            <Input
              placeholder={t("register.inputEmail")}
              function={validateMail}
              onFocus={() => {
                showMessage({
                  message: "Debe ingresar una direccion de correo valida",
                  type: "warning",
                  duration: 2500,
                  backgroundColor: "#50C2C9",
                  position: "top",
                });
              }}
            />
            <Input
              placeholder={t("register.inputPassword")}
              function={handlePassword}
              secureTextEntry={true}
              onFocus={() => {
                showMessage({
                  message: "Debe ingresar una password segura",
                  type: "warning",
                  duration: 2500,
                  backgroundColor: "#50C2C9",
                  position: "top",
                });
              }}
            />
            <Input
              placeholder={t("register.inputConfirmPassword")}
              function={handleConfirmPassword}
              secureTextEntry={true}
              onFocus={() => {
                showMessage({
                  message: "Las contraseñas deben coincidir",
                  type: "warning",
                  duration: 2500,
                  backgroundColor: "#50C2C9",
                  position: "top",
                });
              }}
            />
          </View>
          <ButtonReu text="Register" function={submit} />
          <Text style={styles.text}>
            {t("register.buttonRegister")}
            <Text
              style={styles.textLogin}
              onPress={() => navigation.navigate("Login")}
            >
              {" "}
              {t("register.navigateSignIn")}
            </Text>{" "}
          </Text>
        </View>
      </View>
    </>
  );
}
