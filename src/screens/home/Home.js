import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import React from "react";
import ButtonReu from "../../components/button/ButtonReu";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import t from "../../services/translate";
import { deleteTask, getAllTasks, logOut } from "../../services/api";
import SwipeableFlatList from "react-native-swipeable-list";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home(props) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { navigation } = props;

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      getAllTasks({ token, setTasks });
    } catch (error) {
      console.log(error);
    }
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
  const createTwoButtonAlert = (_id, description) =>
    Alert.alert(
      "Esta seguro que desea eliminar esta tarea?",
      `${description}`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const token = await AsyncStorage.getItem("token");
            deleteTask(_id, token, setTasks);
            onRefresh();
          },
        },
      ]
    );

  const QuickActions = (item) => {
    const { _id, description } = item.item;
    return (
      <View style={styles.quickActions}>
        <Pressable onPress={() => createTwoButtonAlert(_id, description)}>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2).then(() => {
      getToken().catch((error) => console.log(error));
      setRefreshing(false);
    });
  }, []);

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
          <SwipeableFlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            renderQuickActions={(item) => QuickActions(item)}
            maxSwipeDistance={50}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        )}

        <ButtonReu text={t("home.buttonNewTask")} function={goToPage} />
        <ButtonReu text={t("home.buttonLogout")} function={logout} />
      </View>
    </View>
  );
}
