import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";

const API = "https://http-nodejs-production-9473.up.railway.app";
const LOGIN = API + "/user/login";
const LOGOUT = API + "/user/logout";
const REGISTER = API + "/user/register";
const APIME = API + "/user/me";
const TASK = API + "/task";

export const logIn = ({ email, password, navigation }) => {
  fetch(LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log("TOKEN OBTTENIDO: " + data.token);
      await AsyncStorage.setItem("token", data.token);
      console.log(data.user.name);
      await AsyncStorage.setItem("user", data.user.name);
      if (!data.token) {
        return;
      } else {
        navigation.replace("Home");
      }
    })
    .catch((error) =>
      showMessage({
        type: "warning",
        message: "There was an error logging in",
        duration: 2500,
        backgroundColor: "#50C2C9",
        position: "bottom",
      })
    );
};

export const logOut = ({ token, navigation }) => {
  fetch(LOGOUT, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then(async () => {
      await AsyncStorage.removeItem("token");
      showMessage({
        message: "You have closed session",
        type: "info",
        duration: 2500,
        position: "bottom",
        backgroundColor: "#50C2C9",
      });
      navigation.replace("Login");
      // tokenStorage = null;
    })
    .catch((error) =>
      showMessage({
        message: "There was an error when logging out" + error,
        type: "warning",
        duration: 3000,
      })
    );
};

export const SignUp = ({ name, email, password, confirm, navigation }) => {
  console.log(name);
  if (!name || !email || !password || !confirm) {
    showMessage({
      message: "Please fill in all the fields",
      type: "warning",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else if (name && !/^[a-zA-Z]+( [a-zA-Z]+)*$/.test(name)) {
    showMessage({
      message: "Name may only contain letters and spaces between them",
      type: "warning",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    showMessage({
      message: "Must enter a valid E-mail adress",
      type: "warning",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else if (password && password.length < 7) {
    showMessage({
      message: "Password must be at least 7 characters",
      type: "warning",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else if (password !== confirm) {
    showMessage({
      message: "Password must match",
      type: "warning",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else {
    fetch(REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log(data);
        console.log("TOKEN OBTTENIDO: " + data.token);
        await AsyncStorage.setItem("token", data.token);
        showMessage({
          message: "Welcome!",
          type: "info",
        });
        navigation.replace("Home");
      });
  }
};

export const tokenLogIn = ({ navigation, tokenStorage }) => {
  fetch(APIME, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenStorage,
    },
  }).then(() => {
    navigation.navigate("GetStarted");
  });
};

export const getAllTasks = ({ token, setTasks }) => {
  fetch(TASK, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      setTasks(data.data);
    });
};

export const addTask = ({ description, completed, token }) => {
  if (!description) {
    showMessage({
      message: "Cannot create an empty task",
      type: "danger",
      icon: "auto",
      statusBarHeight: 40,
    });
  } else {
    fetch(TASK, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: description,
        completed: completed,
      }),
    });
    showMessage({
      message: "Task created successfully",
      type: "info",
      duration: 2500,
      position: "bottom",
      backgroundColor: "#50C2C9",
    });
  }
};

export const deleteTask = (_id, token) => {
  fetch(`${TASK}/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const updateTask = ({ _id, description, completed, token }) => {
  fetch(TASK + "/" + _id, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: description,
      completed: completed,
    }),
  })
    .then(() => {
      console.log("task updated successfully");
      showMessage({
        message: "Task updated successfully",
        type: "info",
        duration: 2500,
        position: "bottom",
        backgroundColor: "#50C2C9",
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const GetTaskID = ({
  _id,
  token,
  setEditableTask,
  setCompleted,
  setIdTask,
}) => {
  fetch(`${TASK}/${_id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      // console.log("Data traida");
      console.log(data);
      // console.log(data.data);
      setEditableTask(data.data.description);
      setCompleted(data.data.completed);
      setIdTask(data.data._id);
    })
    .catch((error) => console.log(error));
};
