import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import t from "../../services/translate";
import { getAllTasks, logOut } from "../../services/api";

export default function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;

  const getToken = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("token");
      getAllTasks({ token, setTasks });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      getToken();
    });
  }, [navigation]);

  const goToPage = () => {
    navigation.navigate("createNewTask");
  };

  const logout = async () => {
    const token = await AsyncStorage.getItem("token");
    logOut({ token, navigation });
  };

  const Item = ({ title }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text style={styles.textItem}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.description} />;
  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
      <View style={styles.container2}>
        <Image
          style={styles.image}
          source={require("../../assets/elipse.png")}
        />
        <Text style={styles.saludo}>Welcome</Text>
        <Text style={styles.text}>{t("home.listTask")}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
        <ButtonReu text={t("home.buttonNewTask")} function={goToPage} />
        <ButtonReu text={t("home.buttonLogout")} function={logout} />
      </View>
    </View>
  );
}
