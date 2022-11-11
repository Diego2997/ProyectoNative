import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";

export default function Home(props) {
  const { navigation } = props;

  const goToPage = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          source={require("../../assets/elipse.png")}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Image
            source={require("../../assets/onboarding.png")}
            style={styles.imageLogin}
          />
          <Text style={styles.welcome}>Get things done with TODo</Text>
          <View style={{ width: "70%" }}>
            <Text style={styles.text}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
              eius architecto maiores nisi ab quidem iure? Facere excepturi
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={goToPage}>
          <Text style={styles.textButton}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
