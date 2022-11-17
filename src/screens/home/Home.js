import { View, Text, Image } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { styles } from "./styles";

export default function Home(props) {
  const [user, setUser] = useState(null);
  const [tokenStorage, setTokenStorage] = useState(null);
  const { navigation } = props;

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
        <Text style={styles.saludo}>Welcome: {user}</Text>
        <Text style={styles.text}>Lista de tareas</Text>
        <ButtonReu text="Create New Task" function={goToPage} />
        <ButtonReu text="Logout" function={logout} />
      </View>
    </View>
  );
}
