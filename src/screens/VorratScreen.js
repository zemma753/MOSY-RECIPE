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

const VorratScreen = ({ navigation }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const findRecipesByIngredient = (ingredient) => {
    return recipes.filter((recipe) => recipe.ingredients.includes(ingredient));
  };

  const handleIngredientPress = (ingredient) => {
    const matchedRecipes = findRecipesByIngredient(ingredient);
    setSelectedRecipes(matchedRecipes);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Reste retten</Text>
      </View>
      <View style={styles.searchInput}>
        <Ionicons name="search-sharp" size={25} color="#6f6d62" />
        <TextInput
          placeholder="Nach Zutaten suchen"
          placeholderTextColor="#6f6d62"
          style={{ marginLeft: 15, fontSize: 18, color: "white" }}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Häufig gesucht</Text>
        <View style={styles.itemsContainer}>
          {/*HÄUFIG GESUCHTEN REZEPTEN */}
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
            onPress={() => handleIngredientPress("Eier")}
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

          {/* ENDE */}
        </View>
        <Text style={styles.sectionTitle}>Rezepte</Text>
        <View style={styles.itemsContainerbelow}>
          {selectedRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => console.log("Recipe selected:", recipe.name)}
            >
              <Image source={recipe.image} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{recipe.name}</Text>
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
    backgroundColor: "#4d4a48",
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
    marginBottom: 10,
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
    backgroundColor: "#4d4a48",
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
    height: 230,
    backgroundColor: "#4d4a48",
    borderRadius: 10,
    // alignItems: "center",
    marginBottom: 20,
  },
  recipeName: {
    fontSize: 16,
    color: "#fff",
  },
  recipeImage: {
    width: widthPercentageToDP(46),
    height: heightPercentageToDP(20),
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 5,
  },
});
