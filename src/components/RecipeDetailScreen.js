import React, { useEffect, useState } from "react";
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
import { getRecipeDetailsById } from "../data/API";

const RecipeDetailScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const details = await getRecipeDetailsById(recipe.id);
        setRecipeDetails(details);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipe]);

  const unitAbbreviations = {
    kilogram: "kg",
    gram: "g",
    liter: "L",
    milliliter: "ml",
    teaspoon: "tsp",
    tablespoon: "tbsp",
    cup: "cup",
    ounce: "oz",
    pound: "lb",
    pinch: "pinch",
  };

  const conversionFactors = {
    "all-purpose flour": 120,
    sugar: 200,
    "brown sugar": 220,
    butter: 240,
    milk: 240,
    water: 240,
  };

  const convertToMetric = (quantity, unit, food) => {
    if (unit === "ounce") {
      return quantity * 28.3495;
    } else if (unit === "pound") {
      return quantity * 453.592;
    } else if (unit === "pinch") {
      return quantity * 0.36;
    } else if (unit === "cup" && conversionFactors[food]) {
      return quantity * conversionFactors[food];
    } else {
      return quantity;
    }
  };

  const scaleIngredients = (ingredients, scale) => {
    return ingredients.map((ingredient) => {
      let quantity = ingredient.amount * scale;
      let unit =
        ingredient.unit && unitAbbreviations[ingredient.unit.toLowerCase()]
          ? unitAbbreviations[ingredient.unit.toLowerCase()]
          : ingredient.unit || "";
      const food = ingredient.name;

      if (
        unit === "ounce" ||
        unit === "pound" ||
        unit === "pinch" ||
        unit === "cup"
      ) {
        quantity = convertToMetric(quantity, unit, food);
        unit = unitAbbreviations[ingredient.unit.toLowerCase()];
      }

      quantity = Math.round(quantity);

      if (quantity > 0) {
        return unit ? `${quantity}x ${unit} ${food}` : `${quantity}x ${food}`;
      } else {
        return food;
      }
    });
  };

  const incrementServings = () => {
    setServings((prevServings) => prevServings + 1);
  };

  const decrementServings = () => {
    setServings((prevServings) => (prevServings > 1 ? prevServings - 1 : 1));
  };

  if (!recipeDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Laden...</Text>
      </View>
    );
  }

  const instructionsText = recipeDetails.analyzedInstructions.length
    ? recipeDetails.analyzedInstructions[0].steps.map((instruction, index) => {
        const key = `instruction_${index}`;
        return (
          <View key={key} style={styles.instructionItem}>
            <View style={styles.circle}>
              <Text style={styles.circleText}>{index + 1}</Text>
            </View>
            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>{instruction.step}</Text>
            </View>
          </View>
        );
      })
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{recipeDetails.title}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: recipeDetails.image }}
          style={styles.recipeImage}
        />
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
          {scaleIngredients(recipeDetails.extendedIngredients, servings).map(
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
});
