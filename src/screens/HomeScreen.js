import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { findRecipesByName, getRandomRecipes } from "../data/API";
import Tips from "../components/Tips";
import HomeRandom from "../components/HomeRandom";
import RecentlyViewed from "../components/RecentlyViewed";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const handleSearch = useCallback(async (query) => {
    if (query.length > 0) {
      try {
        const recipes = await findRecipesByName(query);
        setSearchResults(recipes.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    } else {
      setSearchResults([]);
    }
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const recipes = await getRandomRecipes();
        setRandomRecipes(recipes);
      } catch (error) {
        console.error("Error fetching random recipes:", error);
      }
    };

    fetchRandomRecipes();
  }, []);

  const handleRecipePress = (recipe) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== recipe.id);
      return [recipe, ...filtered];
    });
    navigation.navigate("RecipeDetail", { recipe });
  };

  const navigateToShoppingScreen = () => {
    navigation.navigate("ShoppingList");
  };

  const navigateToVorratScreen = () => {
    navigation.navigate("Stock");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Saving leftovers</Text>
        <TouchableOpacity
          onPress={navigateToShoppingScreen}
          style={{ marginTop: 15 }}
        >
          <Ionicons name="cart" size={30} color="#988e73" />
        </TouchableOpacity>
      </View>

      {searchResults.length > 0 && (
        <FlatList
          horizontal
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => handleRecipePress(item)}
            >
              <Image source={{ uri: item.image }} style={styles.recipeImage} />
              <Text style={styles.recipeName}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.searchResultsContainer}
        />
      )}

      <View style={styles.middleContainer}>
        <Text style={styles.tipsHeader}>Recipes of the day:</Text>
        <View style={styles.recipeContainer}>
          <TouchableOpacity
            style={styles.recipeImageWrapper}
            onPress={() => handleRecipePress(randomRecipes[0])}
          >
            <ImageBackground
              source={{ uri: randomRecipes[0]?.image }}
              style={styles.itemImage}
              imageStyle={{ borderRadius: 20 }}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      <HomeRandom recipes={randomRecipes} onRecipePress={handleRecipePress} />

      <View>
        <TouchableOpacity
          style={styles.transparentBox}
          onPress={navigateToVorratScreen}
        >
          <Image
            source={require("../../assets/kühlschrank.jpg")}
            style={styles.icon}
          />
          <Text style={styles.leftOverHeader}>Save leftovers</Text>
          <Text style={styles.leftOverText}>
            Still have ingredients from last week?{"\n"}Nothing goes to waste
            here.
          </Text>
        </TouchableOpacity>
      </View>

      <RecentlyViewed
        recipes={recentlyViewed}
        onRecipePress={handleRecipePress}
      ></RecentlyViewed>

      <Tips></Tips>
    </ScrollView>
  );
};

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
    justifyContent: "space-between",
    height: heightPercentageToDP(12.5),
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
    marginTop: 15,
  },
  middleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  recipeContainer: {
    position: "relative",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  recipeImageWrapper: {
    marginBottom: 10,
  },
  itemImage: {
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(30),
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  recipeNameOverlay: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: "auto",
  },
  recipeItem: {
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 10,
    width: 200,
  },
  horizontalRecipeItem: {
    width: 200,
    margin: 10,
    backgroundColor: "#252421",
    borderRadius: 10,
  },
  recipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  recipeName: {
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  searchResultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  transparentBox: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 60,
    height: 60,
  },

  leftOverHeader: {
    color: "#fff",
    bottom: 30,
    left: 20,
    fontSize: 23,
  },
  leftOverText: {
    color: "#fff",
    fontSize: 16,
    right: 110,
    top: 10,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",

    alignSelf: "flex-start",
    paddingBottom: 10,
    marginStart: 20,
  },
});

export default HomeScreen;
