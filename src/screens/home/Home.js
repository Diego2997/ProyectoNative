import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import axios from "axios";
import { styles } from "./styles";
import t from "../../services/translate";
import reactotron from "reactotron-react-native";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Home(props) {
  const [user, setUser] = useState(null);
  const [tokenStorage, setTokenStorage] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { navigation } = props;

  const getTask = async () => {
    try {
      const request = await axios.get(
        "https://api-nodejs-todolist.herokuapp.com/task",
        {
          headers: { Authorization: "Bearer " + tokenStorage },
        }
      );
      setTasks(request.data);
    } catch (error) {
      reactotron.log(error);
    }
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    const name = await AsyncStorage.getItem("name");
    const tareas = await getTask();
    console.log(tareas);
    setUser(name);
    setTokenStorage(token);
    setTasks(tareas.data);

    if (!token) {
      navigation.navigate("Register");
    }
    return { token, name, tareas };
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

  const renderItem = ({ item }) => <Item title={item.description} />;

  // data={tasks}
  //         keyExtractor={x => String(x._id)}
  //         renderItem={({item}) => <Text>{item.description}</Text>}
  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <Text style={styles.saludo}>Welcome {user}</Text>
        <Text style={styles.text}>{t("home.listTask")}</Text>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <ButtonReu text={t("home.buttonNewTask")} function={goToPage} />
        <ButtonReu text={t("home.buttonLogout")} function={logout} />
      </View>
    </View>
  );
}
