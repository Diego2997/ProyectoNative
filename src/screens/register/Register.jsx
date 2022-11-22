import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "./styles.js";
import Input from "../../components/input/Input.js";
import ButtonReu from "../../components/button/ButtonReu.js";
import { useState } from "react";
import t from "../../services/translate";
import { SignUp } from "../../services/api.js";

export default function Register(props) {
  const { navigation } = props;
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const handleRegister = () => {
    SignUp({ name, email, password, confirm, navigation });
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
              onChangeText={setName}
            />
            <Input
              placeholder={t("register.inputEmail")}
              onChangeText={setEmail}
            />
            <Input
              placeholder={t("register.inputPassword")}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <Input
              placeholder={t("register.inputConfirmPassword")}
              onChangeText={setConfirm}
              secureTextEntry={true}
            />
          </View>
          <ButtonReu text="Register" function={handleRegister} />
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
