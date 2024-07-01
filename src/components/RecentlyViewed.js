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
import { useRecentlyViewed } from "../components/FavoritesContext";

const RecentlyViewed = ({ navigation }) => {
  const { recentlyViewed } = useRecentlyViewed();

  const handleRecipePress = (recipe) => {
    navigation.navigate("RecipeDetail", { recipe });
  };

  return (
    <View>
      <Text style={styles.header}>Recently Viewed Recipes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recentlyViewed.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recipeItem}
            onPress={() => handleRecipePress(recipe)}
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <Text style={styles.recipeName}>{recipe.title}</Text>
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
    marginTop: 20,
    marginBottom: 10,
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
});

export default RecentlyViewed;
