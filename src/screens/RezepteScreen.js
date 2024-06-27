import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  findRecipesByCategory,
  getRecipeDetailsById,
  findRecipesByName,
} from "../data/API";
import { useFavorites } from "../components/FavoritesContext";

const RezepteScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const { favorites, setFavorites } = useFavorites(); // Verwenden Sie den useFavorites-Hook

  const handleCategoryPress = async (category) => {
    setSelectedCategory(category);
    try {
      const recipes = await findRecipesByCategory(category);
      setSelectedRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleRecipePress = async (id) => {
    try {
      const recipe = await getRecipeDetailsById(id);
      navigation.navigate("RecipeDetail", { recipe });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleFavoritePress = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const categories = [
    {
      name: "main course",
      image: require("../../assets/ingredients/eier.png"),
    },
    { name: "dessert", image: require("../../assets/ingredients/paprika.png") },
    { name: "salad", image: require("../../assets/ingredients/zwiebel.png") },
    { name: "snack", image: require("../../assets/ingredients/sellerie.png") },
    {
      name: "breakfast",
      image: require("../../assets/ingredients/carrots.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Recipes</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category.name && styles.selectedCategory,
            ]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.content}>
        <View style={styles.itemsContainerbelow}>
          {selectedRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => handleRecipePress(recipe.id)}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <Text style={styles.recipeName}>{recipe.title}</Text>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => handleFavoritePress(recipe)}
              >
                <Ionicons name="star" size={25} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RezepteScreen;

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
    height: 50,
    paddingTop: 15,
    paddingStart: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  categoriesContainer: {
    marginVertical: 10,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252421",
    borderRadius: 50,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#6f6d62",
  },
  categoryImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  content: {
    flex: 1,
  },
  itemsContainerbelow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  recipeItem: {
    width: "48.5%",
    height: 290,
    backgroundColor: "#252421",
    borderRadius: 10,
    marginBottom: 20,
    position: "relative",
  },
  recipeName: {
    fontSize: 16,
    color: "#fff",
    paddingStart: 10,
    flexWrap: "wrap",
  },
  recipeImage: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#6f6d62",
    borderRadius: 15,
    padding: 5,
  },
});
