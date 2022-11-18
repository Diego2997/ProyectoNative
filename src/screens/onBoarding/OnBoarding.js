import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import t from "../../services/translate";

export default function OnBoarding(props) {
  const { navigation } = props;

  const goToPage = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={{ backgroundColor: "#EDEDEE" }}>
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
          <Text style={styles.welcome}>{t("onboarding.welcome")}</Text>
          <View style={{ width: "70%" }}>
            <Text style={styles.text}>{t("onboarding.lorem")}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={goToPage}>
          <Text style={styles.textButton}>{t("onboarding.getStarted")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
