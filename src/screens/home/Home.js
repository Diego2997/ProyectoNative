import { View, Text, Image } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { styles } from "./styles";
import t from "../../services/translate";

export default function Home(props) {
  const [user, setUser] = useState(null);
  const [tokenStorage, setTokenStorage] = useState(null);
  const [task, setTask] = useState([]);
  const { navigation } = props;

  const getTask = async () => {
    try {
      const request = await axios.get(
        "https://api-nodejs-todolist.herokuapp.com/task",
        {},
        {
          headers: { Authorization: "Bearer " + tokenStorage },
        }
      );
      console.log(request.data);
    } catch (error) {
      showMessage({
        message: "Ocurrio un error inesperado",
        type: "warning",
        position: "bottom",
      });
    }
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const name = await AsyncStorage.getItem("name");
    setUser(name);
    setTokenStorage(token);
    if (!token) {
      navigation.navigate("Register");
    }
    return { token, name };
  };

  useEffect(() => {
    getToken();
    getTask();
  }, []);
  const goToPage = () => {
    navigation.navigate("createNewTask");
  };

  const logout = async () => {
    try {
      const request = await axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/logout",
        {},
        {
          headers: { Authorization: "Bearer " + tokenStorage },
        }
      );
      console.log(request.data);
      showMessage({
        message: "Has cerrado sesion",
        type: "info",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      });
      navigation.goBack();
    } catch (error) {
      showMessage({
        message: "Ocurrio un error inesperado",
        type: "warning",
        position: "bottom",
      });
    }
  };

  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <Text style={styles.saludo}>Welcome {user}</Text>
        <Text style={styles.text}>{t("home.listTask")}</Text>
        <ButtonReu text={t("home.buttonNewTask")} function={goToPage} />
        <ButtonReu text={t("home.buttonLogout")} function={logout} />
      </View>
    </View>
  );
}
