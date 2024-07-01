import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { findRecipesByIngredient, getRecipeDetailsById } from "../data/API";
import debounce from "lodash.debounce";
import { useFavorites } from "../components/FavoritesContext";

const VorratScreen = ({ navigation }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { favorites, setFavorites } = useFavorites();

  const isFavorite = (recipe) => favorites.some((fav) => fav.id === recipe.id);

  const handleSearch = useCallback(
    debounce(async (input) => {
      if (input.length > 0) {
        try {
          const ingredients = input
            .split(",")
            .map((ingredient) => ingredient.trim());
          const recipes = await findRecipesByIngredient(ingredients);
          setSelectedRecipes(recipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        setSelectedRecipes([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    handleSearch(searchInput);
  }, [searchInput]);

  const handleRecipePress = async (id) => {
    try {
      const recipe = await getRecipeDetailsById(id);
      navigation.navigate("RecipeDetail", { recipe });
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const handleFavoritePress = (recipe) => {
    if (isFavorite(recipe)) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Saving leftovers</Text>
      </View>
      <View style={styles.searchInput}>
        <Ionicons name="search-sharp" size={25} color="#6f6d62" />
        <TextInput
          placeholder="Nach Zutaten suchen"
          placeholderTextColor="#6f6d62"
          style={{
            marginLeft: 15,
            fontSize: 18,
            color: "white",
            flex: 1,
          }}
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <TouchableOpacity onPress={() => setSearchInput("")}>
          <Ionicons name="close" size={25} color="#6f6d62" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.itemsContainerbelow}>
          {selectedRecipes &&
            selectedRecipes.map((recipe, index) => (
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
                  style={styles.favoriteIcon}
                  onPress={() => handleFavoritePress(recipe)}
                >
                  <AntDesign
                    name={isFavorite(recipe) ? "star" : "staro"}
                    size={25}
                    color="#E5C100"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VorratScreen;

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
  searchInput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    margin: 20,
    backgroundColor: "#252421",
    borderRadius: 30,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
    marginTop: 10,
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
  },
  recipeTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeName: {
    fontSize: 16,
    color: "#fff",
    paddingStart: 10,
    flexWrap: "wrap",
    flex: 1,
  },
  recipeImage: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
