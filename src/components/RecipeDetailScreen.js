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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { IngredientsTab, InstructionsTab } from "./RecipeTabs";
import { AntDesign } from "@expo/vector-icons";
import { useFavorites } from "../components/FavoritesContext";

const Tab = createMaterialTopTabNavigator();

const RecipeDetailScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [servings, setServings] = useState(1);
  const { favorites, setFavorites } = useFavorites();

  const isFavorite = (recipe) => favorites.some((fav) => fav.id === recipe.id);

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

  if (!recipeDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleFavoritePress = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: recipeDetails.image }} style={styles.recipeImage} />
      <View style={styles.recipeTitleContainer}>
        <Text style={styles.recipeName}>{recipe.title}</Text>
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => handleFavoritePress(recipe)}
        >
          <AntDesign
            name={isFavorite(recipe) ? "star" : "staro"}
            size={25}
            color="#E5C100"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.nutritionTitle}>Nutrition Per Serving</Text>
      <View style={styles.nutritionContainer}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionText}>Calories</Text>
          <Text style={styles.nutritionValue}>
            {recipeDetails.nutrition.nutrients.find(
              (n) => n.name === "Calories"
            )?.amount || "N/A"}{" "}
            kcal
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionText}>Protein</Text>
          <Text style={styles.nutritionValue}>
            {recipeDetails.nutrition.nutrients.find((n) => n.name === "Protein")
              ?.amount || "N/A"}{" "}
            g
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionText}>Fat</Text>
          <Text style={styles.nutritionValue}>
            {recipeDetails.nutrition.nutrients.find((n) => n.name === "Fat")
              ?.amount || "N/A"}{" "}
            g
          </Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionText}>Carbs</Text>
          <Text style={styles.nutritionValue}>
            {recipeDetails.nutrition.nutrients.find(
              (n) => n.name === "Carbohydrates"
            )?.amount || "N/A"}{" "}
            g
          </Text>
        </View>
      </View>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#353430",
            },
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "#6f6d62",
            tabBarIndicatorStyle: {
              backgroundColor: "#e8def7",
            },
          }}
        >
          <Tab.Screen name="Ingredients">
            {() => (
              <IngredientsTab
                recipeDetails={recipeDetails}
                servings={servings}
                scaleIngredients={scaleIngredients}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Instructions">
            {() => <InstructionsTab recipeDetails={recipeDetails} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ScrollView>
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
  },
  recipeImage: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(60),
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.6,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  nutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  nutritionItem: {
    alignItems: "center",
  },
  nutritionText: {
    fontSize: 19,
    color: "#6f6d62",
  },
  nutritionValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 15,
  },
  nutritionTitle: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "flex-start",
    margin: 20,
  },
  tabContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  recipeName: {
    fontSize: 25,
    color: "white",
    flex: 1,
    marginRight: 10,
  },
  recipeTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  favoriteIcon: {},
});
