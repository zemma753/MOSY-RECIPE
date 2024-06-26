import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const ShoppingListScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleAddItem = () => {
    if (itemName.trim() !== "" && itemQuantity.trim() !== "") {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          name: itemName,
          quantity: itemQuantity,
          completed: false,
        },
      ]);
      setItemName("");
      setItemQuantity("");
    }
  };

  const handleCompleteItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleClearAllItems = () => {
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>ShoppingList</Text>
        <TouchableOpacity
          style={{ alignItems: "flex-end", margin: 10 }}
          onPress={handleClearAllItems}
        >
          <Feather name="trash-2" size={29} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{
                uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`,
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity} x</Text>
            </View>
            <TouchableOpacity onPress={() => handleCompleteItem(item.id)}>
              <View style={styles.circle}>
                {item.completed && (
                  <Ionicons name="checkmark" size={15} color="#e8def7" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Was willst du einkaufen?"
          placeholderTextColor="#aaa"
          value={itemName}
          onChangeText={(text) => setItemName(text)}
        />
        <TextInput
          style={styles.quantityInput}
          placeholder="Menge"
          placeholderTextColor="#aaa"
          value={itemQuantity}
          onChangeText={(text) => setItemQuantity(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Ionicons name="checkmark" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: "flex-start",
    height: heightPercentageToDP(10),
    paddingTop: 15,
    paddingStart: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginRight: "48%",
    marginLeft: 15,
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4d4a48",
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 10,
    height: 50,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
  },
  itemQuantity: {
    color: "#aaa",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 30,
    backgroundColor: "#252421",
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 15,
    fontSize: 18,
    marginEnd: 20,
  },
  quantityInput: {
    width: "20%",
    color: "#fff",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#6f6d62",
    padding: 15,
    borderRadius: 30,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShoppingListScreen;
