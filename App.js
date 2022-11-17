import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./src/screens/register/Register";
import { StatusBar } from "expo-status-bar";
import Login from "./src/screens/login/Login";
import Home from "./src/screens/home/Home";
import FlashMessage from "react-native-flash-message";
import OnBoarding from "./src/screens/onBoarding/OnBoarding";
import createNewTask from "./src/screens/createNewTask/createNewTask";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="default" />
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="createNewTask"
          component={createNewTask}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

export default App;
