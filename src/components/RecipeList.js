import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const RecipeList = ({ route, navigation }) => {
  const { recipes } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView>
        {recipes.map((recipe, index) => (
          <TouchableOpacity key={index} style={styles.recipeItem}>
            <Text style={styles.recipeName}>{recipe.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#353430",
    padding: 20,
  },
  recipeItem: {
    backgroundColor: "#4d4a48",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  recipeName: {
    fontSize: 18,
    color: "#fff",
  },
});
