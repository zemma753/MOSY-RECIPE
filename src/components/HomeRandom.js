import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import {
  useFavorites,
  useRecentlyViewed,
} from "../components/FavoritesContext";

const HomeRandom = ({ recipes, onRecipePress }) => {
  const { favorites, setFavorites } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const handleRecipePress = (recipe) => {
    onRecipePress(recipe);
    addToRecentlyViewed(recipe);
  };

  const isFavorite = (recipe) => favorites.some((fav) => fav.id === recipe.id);

  const handleFavoritePress = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <View>
      <Text style={styles.header}>Discover delicious recipes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recipes.slice(0, 5).map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recipeItem}
            onPress={() => handleRecipePress(recipe)}
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "flex-start",
    paddingBottom: 10,
    marginStart: 20,
  },
  recipeItem: {
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(35),
    marginStart: 20,
    backgroundColor: "#252421",
    borderRadius: 10,
  },
  recipeImage: {
    width: "100%",
    height: heightPercentageToDP(25),
    borderRadius: 10,
  },
  recipeName: {
    color: "#fff",
    alignSelf: "flex-start",
    margin: 10,
    fontSize: 17,
  },
  recipeTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default HomeRandom;
