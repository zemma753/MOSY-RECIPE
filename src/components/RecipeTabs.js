import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

export const IngredientsTab = ({ recipeDetails, scaleIngredients }) => {
  const [servings, setServings] = useState(1);

  const incrementServings = () => {
    setServings((prevServings) => prevServings + 1);
  };

  const decrementServings = () => {
    setServings((prevServings) => (prevServings > 1 ? prevServings - 1 : 1));
  };

  return (
    <ScrollView style={styles2.tabContent}>
      <View style={styles2.servingsContainer}>
        <View style={styles2.servingsControl}>
          <TouchableOpacity
            onPress={decrementServings}
            style={styles2.servingsButton}
          >
            <Ionicons name="remove-circle" size={50} color="#6f6d62" />
          </TouchableOpacity>
          <Text style={styles2.servingsText}>{servings}</Text>
          <TouchableOpacity
            onPress={incrementServings}
            style={styles2.servingsButton}
          >
            <Ionicons name="add-circle" size={50} color="#6f6d62" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles2.ingredientsList}>
        {scaleIngredients(recipeDetails.extendedIngredients, servings).map(
          (ingredient, index) => (
            <Text key={index} style={styles2.ingredientItem}>
              {ingredient}
            </Text>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles2 = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#353430", // Set background color to match overall app theme
  },
  servingsContainer: {
    alignItems: "center",
    margin: 20,
  },
  servingsControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  servingsButton: {
    marginHorizontal: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  servingsText: {
    fontSize: 50,
    color: "#fff",
  },
  ingredientItem: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  ingredientsList: {
    marginHorizontal: 90,
    marginBottom: 20,
  },
});

export const InstructionsTab = ({ recipeDetails }) => (
  <ScrollView style={styles3.tabContent}>
    {recipeDetails.analyzedInstructions.length
      ? recipeDetails.analyzedInstructions[0].steps.map(
          (instruction, index) => (
            <View key={index} style={styles3.instructionItem}>
              <View style={styles3.circle}>
                <Text style={styles3.circleText}>{index + 1}</Text>
              </View>
              <View style={styles3.instructionBox}>
                <Text style={styles3.instructionText}>{instruction.step}</Text>
              </View>
            </View>
          )
        )
      : null}
  </ScrollView>
);

const styles3 = StyleSheet.create({
  tabContent: {
    flex: 1,
    backgroundColor: "#353430",
  },
  instructionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
  },
  instructionItem: {
    alignItems: "center",
    marginTop: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#252421",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  circleText: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
  },
  instructionBox: {
    backgroundColor: "#212121",
    borderRadius: 10,
    padding: 10,
    width: widthPercentageToDP(90),
    alignSelf: "center",
    transform: [{ translateY: -30 }],
    opacity: 0.5,
    paddingHorizontal: 20,
  },
});
