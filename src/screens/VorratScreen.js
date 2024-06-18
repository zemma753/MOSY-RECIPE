import React, { useState, useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";
import { findRecipesByIngredient } from "../data/API";

const VorratScreen = ({ navigation }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput.length > 0) {
      handleSearch();
    } else {
      setSelectedRecipes([]);
    }
  }, [searchInput]);

  const handleSearch = async () => {
    try {
      const recipes = await findRecipesByIngredient(searchInput);
      setSelectedRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

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
          onChangeText={(text) => setSearchInput(text)}
        />
        <TouchableOpacity onPress={() => setSearchInput("")}>
          <Ionicons name="close" size={25} color="#6f6d62" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Rezepte</Text>
        <View style={styles.itemsContainerbelow}>
          {selectedRecipes.map((recipeData, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => handleRecipePress(recipeData.recipe)}
            >
              <Image
                source={{ uri: recipeData.recipe.image }}
                style={styles.recipeImage}
              />
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{recipeData.recipe.label}</Text>
                <View style={styles.recipetimeContainer}>
                  <Feather
                    name="clock"
                    size={18}
                    color="#6f6d62"
                    style={styles.recipeTimeIcon}
                  />
                  <Text style={styles.recipeTime}>
                    {recipeData.recipe.totalTime > 0
                      ? `${recipeData.recipe.totalTime} Min`
                      : "-"}
                  </Text>
                </View>
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
  itemsContainerbelow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  recipeItem: {
    width: "48.5%",
    height: 270,
    backgroundColor: "#252421",
    borderRadius: 10,
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: "65%",
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeDetails: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  recipeName: {
    fontSize: 16,
    color: "#fff",
  },
  recipeTime: {
    fontSize: 14,
    color: "#6f6d62",
  },
  recipeTimeIcon: {
    marginRight: 5,
  },
  recipetimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
});
