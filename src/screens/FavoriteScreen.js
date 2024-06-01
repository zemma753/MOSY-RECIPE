import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const initialFavorites = [
  { id: '1', name: 'Omlett', image: require('../../assets/omlett.jpg') },
  { id: '2', name: 'Kartoffelauflauf', image: require('../../assets/kartoffelauflauf.jpg') },
  { id: '3', name: 'Lasagne', image: require('../../assets/lasagne.jpg') },
  { id: '4', name: 'Nudelsalat', image: require('../../assets/Nudelsalat.jpg') },
  { id: '5', name: 'Bulgur Reis', image: require('../../assets/bulgur.jpg') },
  // Weitere Platzhalter für Rezepte
];

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleRecipePress = (item) => {
    // Hier die Navigation oder eine andere Aktion hinzufügen
  };

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== item.id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Ionicons name="star" size={25} color="black" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRecipePress(item)} style={styles.itemContent}>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Favoriten</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
    height: hp(10),
    paddingTop: 15,
    paddingStart: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4d4a48",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10, // Abstand zwischen Bild und Text
  },
});
