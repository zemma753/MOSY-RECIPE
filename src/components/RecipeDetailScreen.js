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
      const parts = ingredient.split(" ");
      let quantity = parseFloat(parts[0]);
      let unit = parts[1];
      let name = parts.slice(2).join(" ");
      if (isNaN(quantity)) {
        quantity = 1;
        unit = parts[0];
        name = parts.slice(1).join(" ");
      }
      const scaledQuantity = quantity * scale;
      return `${scaledQuantity} ${unit || ""} ${name}`;
    });
  };

  const incrementServings = () => {
    setServings((prevServings) => prevServings + 1);
  };

  const decrementServings = () => {
    setServings((prevServings) => (prevServings > 1 ? prevServings - 1 : 1));
  };

  const instructionsText = recipe.instructions.map((instruction, index) => {
    const key = `instruction_${index}`;
    return (
      <View key={key} style={styles.instructionItem}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{index + 1}</Text>
        </View>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={recipe.image} style={styles.recipeImage} />
          <Text style={styles.headerText}>{recipe.name}</Text>
        </View>
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
        {instructionsText}
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
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -180 }, { translateY: 300 }],
    fontSize: 24,
    fontWeight: "heavy",
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  content: {
    alignItems: "center",
    //padding: 20,
  },
  recipeImage: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(95),
    resizeMode: "cover",
    borderRadius: 10,
    opacity: 0.7,
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
    alignSelf: "center",
    marginBottom: 20,
  },
  ingredientItem: {
    fontSize: 19,
    color: "#fff",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 60,
    alignSelf: "flex-start",
  },
  instructionItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#252421",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
    width: widthPercentageToDP(100),
    height: 100,
    alignSelf: "flex-start",
    justifyContent: "center",
    transform: [{ translateY: -30 }],
    opacity: 0.5,
    paddingHorizontal: 20,
  },
  instructionText: {
    //fontSize: 19,
    color: "#fff",
  },
});
