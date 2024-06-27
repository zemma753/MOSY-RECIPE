import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import { useFavorites } from "../components/FavoritesContext";

const FavoriteScreen = ({ navigation }) => {
  const { favorites } = useFavorites(); // Verwenden Sie den useFavorites-Hook

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favorites</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.itemsContainerbelow}>
          {favorites.map((recipe, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recipeItem}
              onPress={() => navigation.navigate("RecipeDetail", { recipe })}
            >
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
              />
              <Text style={styles.recipeName}>{recipe.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoriteScreen;

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
});
