import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const favorites = [
  { id: '1', name: 'Omlett' },
  { id: '2', name: 'Kartoffelauflauf' },
  { id: '3', name: 'Lasagne' },
  { id: '4', name: 'Nudelsalat' },
  { id: '5', name: 'Bulgur Reis' },
  // Weitere Platzhalter für Rezepte
];

export default function FavoriteScreen({ navigation }) {
  const handleRecipePress = (item) => {
    // Hier die Navigation oder eine andere Aktion hinzufügen

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRecipePress(item)}>
      <View style={styles.itemContainer}>
        <Ionicons name="star-outline" size={25} color="black" style={styles.icon} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
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
  itemText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10, // Abstand zwischen Stern und Text
  },
});
