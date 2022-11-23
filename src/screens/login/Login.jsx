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
import t from "../../services/translate";
import { logIn } from "../../services/api";

export default function Login(props) {
  const { navigation } = props;

  const [email, setEmail] = useState("diego@admin.com");
  const [password, setPassword] = useState("diego1234");
  const [isloading, setIsloading] = useState(false);

  const handleLogIn = () => {
    setIsloading(true);
    logIn({
      email,
      password,
      navigation,
    });
    setIsloading(false);
  };

  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          source={require("../../assets/elipse.png")}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.welcome}>{t("login.welcome")}</Text>
          <Image
            source={require("../../assets/login.png")}
            style={styles.imageLogin}
          />
        </View>
        <View style={styles.containerInput}>
          <Input
            value={email}
            placeholder={t("login.inputEmail")}
            onChangeText={setEmail}
          />
          <Input
            value={password}
            placeholder={t("login.inputPassword")}
            onChangeText={setPassword}
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
            <Text style={styles.textLogin}>
              {t("login.textForgetPassword")}
            </Text>
          </TouchableOpacity>
        </View>
        {isloading ? (
          <ActivityIndicator size="large" color="#50C2C9" />
        ) : (
          <ButtonReu text="Log In" function={handleLogIn} />
        )}
        <Text style={styles.text}>
          {t("login.buttonLogin")}
          <Text
            style={styles.textLogin}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            {t("login.navigateSignUp")}
          </Text>{" "}
        </Text>
      </View>
    </View>
  );
}
