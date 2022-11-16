import { View } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Home(props) {
  const { navigation } = props;

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    getToken();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    showMessage({
      message: "Has cerrado sesion",
      type: "info",
      duration: 2500,
      backgroundColor: "#50C2C9",
      position: "bottom",
    });
    navigation.goBack();
  };

  return (
    <View>
      <ButtonReu text="Logout" function={logout} />
    </View>
  );
}
