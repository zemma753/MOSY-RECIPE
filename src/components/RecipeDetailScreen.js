import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const RecipeDetailScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const [servings, setServings] = useState(1);

  const scaleIngredients = (ingredients, scale) => {
    return ingredients.map((ingredient) => {
      const quantity = ingredient.quantity ? ingredient.quantity * scale : "";
      const unit = ingredient.unit || "";
      const food = ingredient.food || "";
      return `${quantity} ${unit} ${food}`.trim();
    });
  };

  const incrementServings = () => {
    setServings((prevServings) => prevServings + 1);
  };

  const decrementServings = () => {
    setServings((prevServings) => (prevServings > 1 ? prevServings - 1 : 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <View style={styles.servingsContainer}>
          <View style={styles.servingsControl}>
            <TouchableOpacity
              onPress={decrementServings}
              style={styles.servingsButton}
            >
              <Ionicons name="remove-circle" size={50} color="#6f6d62" />
            </TouchableOpacity>
            <Text style={styles.servingsText}>{servings}</Text>
            <TouchableOpacity
              onPress={incrementServings}
              style={styles.servingsButton}
            >
              <Ionicons name="add-circle" size={50} color="#6f6d62" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ingredientsList}>
          {scaleIngredients(recipe.ingredients, servings).map(
            (ingredient, index) => (
              <Text key={index} style={styles.ingredientItem}>
                {ingredient}
              </Text>
            )
          )}
        </View>

        <Text style={styles.sectionTitle}>Anleitung</Text>
        <Text style={styles.instructionText}>{recipe.instructions}</Text>
      </ScrollView>
    </View>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353430",
  },
  header: {
    backgroundColor: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#424242",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: heightPercentageToDP(10),
    paddingTop: 15,
    paddingStart: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  recipeImage: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(30),
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
  },
  servingsContainer: {
    alignItems: "center",
    marginBottom: 20,
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
  ingredientsList: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  ingredientItem: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  instructionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
  },
});
