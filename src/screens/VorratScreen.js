import React, { useState } from "react";
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
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import recipes from "../data/Recipe";
import { Feather } from "@expo/vector-icons";

const VorratScreen = ({ navigation }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const findRecipesByIngredient = (ingredient) => {
    return recipes.filter((recipe) =>
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
      )
    );
  };

  const handleIngredientPress = (ingredient) => {
    const matchedRecipes = findRecipesByIngredient(ingredient);
    setSelectedRecipes(matchedRecipes);
  };

  //ZEIGT REZEPTE AN DIE NUR DIESE ZUTATEN BEINHALTEN

  const handleSearch = () => {
    const searchIngredients = searchInput
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim());

    // ZEIGT REZEPTE AN DIE DIE MINDESTENS EINE DER ZUTATEN BEINHALTEN
    const matchedRecipesWithAnyIngredient = recipes.filter((recipe) =>
      searchIngredients.some((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient)
        )
      )
    );

    // ZEIGT REZEPTE AN DIE NUR DIE ANGEGEBENEN ZUTATEN BEINHALTEN
    const matchedRecipes = matchedRecipesWithAnyIngredient.filter((recipe) =>
      searchIngredients.every((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient)
        )
      )
    );

    setSelectedRecipes(matchedRecipes);
  };

  // ZEIGT REZEPTE AN DIE DIE MINDESTENS EINE DER ZUTATEN BEINHALTEN

  /*const handleSearch = () => {
    const searchIngredients = searchInput
      .toLowerCase()
      .split(",")
      .map((ingredient) => ingredient.trim());

    const matchedRecipes = recipes.filter((recipe) => {
      return searchIngredients.some((ingredient) =>
        recipe.ingredients.some((recipeIngredient) =>
          recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
    });

    setSelectedRecipes(matchedRecipes);
  };
  */

  const handleRecipePress = (recipe) => {
    navigation.navigate("RecipeDetail", { recipe });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Reste retten</Text>
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
          onChangeText={(text) => {
            setSearchInput(text);
            handleSearch();
          }}
        />
        <TouchableOpacity onPress={() => setSearchInput("")}>
          <Ionicons name="close" size={25} color="#6f6d62" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Häufig gesucht</Text>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleIngredientPress("Karotte")}
          >
            <Image
              source={require("../../assets/ingredients/carrots.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Karotte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleIngredientPress("Paprika")}
          >
            <Image
              source={require("../../assets/ingredients/paprika.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Paprika</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleIngredientPress("Ei")}
          >
            <Image
              source={require("../../assets/ingredients/eier.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Ei</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleIngredientPress("Zwiebel")}
          >
            <Image
              source={require("../../assets/ingredients/zwiebel.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Zwiebel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleIngredientPress("Sellerie")}
          >
            <Image
              source={require("../../assets/ingredients/sellerie.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Sellerie</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Rezepte</Text>
        <View style={styles.itemsContainerbelow}>
          {selectedRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => handleRecipePress(recipe)}
            >
              <Image source={recipe.image} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <View style={styles.recipetimeContainer}>
                <Feather
                  name="clock"
                  size={24}
                  color="#6f6d62"
                  style={styles.recipeTime}
                />
                <Text style={styles.recipeTime}>{recipe.time} Min</Text>
              </View>
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
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  itemsContainerbelow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#252421",
    borderRadius: 50,
    alignItems: "center",
    padding: 10,
    margin: 5,
  },
  itemImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
  },
  itemName: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginLeft: 15,
  },
  recipeItem: {
    width: "48%",
    height: heightPercentageToDP(32),
    backgroundColor: "#252421",
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 16,
    color: "#fff",
    margin: 9,
    marginBottom: 30,
  },
  recipeImage: {
    width: widthPercentageToDP(46),
    height: heightPercentageToDP(20),
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  recipetimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  recipeTime: {
    paddingStart: 10,
    color: "#6f6d62",
  },
});
