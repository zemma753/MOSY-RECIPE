import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import index from "./src/navigation/AppNavigation";
import AppNavigation from "./src/navigation/AppNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return <AppNavigation></AppNavigation>;
}
