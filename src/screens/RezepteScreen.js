import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function RezepteScreen() {
  return (
    <View style={styles.container}>
      <Text>RezepteScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#353430",
    padding: 16,
  },
});
