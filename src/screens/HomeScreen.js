import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { findRecipesByName, getRandomRecipes } from "../data/API";

const tips = [
  {
    id: "1",
    image: require("../../assets/obst.jpg"),
    text: "Store tomatoes at room temperature instead of in the refrigerator to prevent loss of flavor.",
  },
  {
    id: "2",
    image: require("../../assets/kraeuter.jpg"),
    text: "Store herbs in a glass of water in the refrigerator to extend their freshness.",
  },
  {
    id: "3",
    image: require("../../assets/brot.jpg"),
    text: "Use stale bread to make delicious croutons or a bread pudding.",
  },
  {
    id: "4",
    image: require("../../assets/bananen.jpg"),
    text: "Store bananas separately from other fruits as they release ethylene gas, which speeds up the ripening of other fruits.",
  },
];

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextRecipe = () => {
    if (currentIndex < randomRecipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevRecipe = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        <Text style={styles.recipeOfDay}>Recipes of the day:</Text>
        <View style={styles.recipeContainer}>
          <TouchableOpacity
            style={styles.recipeImageWrapper}
            onPress={() => handleRecipePress(randomRecipes[currentIndex])}
          >
            <ImageBackground
              source={{ uri: randomRecipes[currentIndex]?.image }}
              style={styles.itemImage}
              imageStyle={{ borderRadius: 30 }}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.transparentBox}
        onPress={navigateToVorratScreen}
      >
        <Image
          source={require("../../assets/kühlschrank.jpg")}
          style={styles.icon}
        />
        <Text style={styles.transparentBoxText}>
          Save leftovers: Still have ingredients from last week? Nothing goes to
          waste here.
        </Text>
      </TouchableOpacity>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tips and tricks</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.tipsScrollContainer}
          style={styles.tipsScrollView}
        >
          {tips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <Image source={tip.image} style={styles.tipImage} />
              <Text style={styles.tipText}>{tip.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
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
  searchInput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: "#4d4a48",
    borderRadius: 30,
    marginTop: 20,
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
    //borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeOfDay: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    paddingBottom: 10,
    textAlign: "center",
  },
  tipsContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    paddingBottom: 10,
  },
  tipsScrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tipsScrollView: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: "#353430",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 10,
    width: 250, // Added fixed width
    height: 200, // Added fixed height
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tipImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  tipText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  arrowButton: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    position: "absolute",
    bottom: -40,
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
  },
  recipeImage: {
    width: 100,
    height: 100,
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
    flexDirection: "row", // Added flexDirection to align icon and text horizontally
    alignItems: "center", // Added alignItems to center items vertically
  },
  transparentBoxText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginLeft: 10, // Added margin for spacing between icon and text
    flex: 1, // Added flex to the text to ensure it takes remaining space
  },
  icon: {
    width: 60, // Adjusted width and height of the icon
    height: 60,
  },
});

export default HomeScreen;
