import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

export default function StartScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <LottieView
          autoPlay
          ref={animation}
          style={styles.lottie}
          source={require("../../assets/lottie/RecipeLogo.json")}
        />
      </View>
      <View>
        <Text style={styles.title}>Recipe Saver</Text>
        <Text style={styles.subtitle}>
          Save and manage your favorite recipes with ease
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9ACD32",
    padding: 16,
  },
  lottie: {
    width: 400,
    height: 300,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 5,
    elevation: 30,
    width: "80%",
    marginTop: 70,
  },
  buttonText: {
    fontSize: 22,
    color: "#9ACD32",
    textAlign: "center",
    fontWeight: "bold",
  },
});
