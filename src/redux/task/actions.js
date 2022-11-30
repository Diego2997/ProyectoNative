import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllTasks } from "../../services/api";
export const increment = () => {
  return {
    type: "GET_ALL_TASK",
  };
};

export const decrement = () => {
  return {
    type: "COUNT_DECRESE",
  };
};

export const getTask = async () => {
  const token = await AsyncStorage.getItem("token");
  const res = await getAllTasks({ token });
  const { data } = res.data;
  return {
    type: "GET_ALL_TASK",
    payload: data,
  };
};
