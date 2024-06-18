import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ShoppingListScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");

    const handleAddItem = () => {
        if (itemName.trim() !== "") {
            setItems([...items, { id: Date.now().toString(), name: itemName }]);
            setItemName("");
        }
    };

    const handleDeleteItem = (id) => {
        const filteredItems = items.filter((item) => item.id !== id);
        setItems(filteredItems);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.header}>Einkaufsliste</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Neues Element hinzufügen"
                    value={itemName}
                    onChangeText={(text) => setItemName(text)}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                            <Ionicons name="trash" size={24} color="#FF6347" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#353430",
        padding: 20,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        flex: 1,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: "#4d4a48",
        color: "#fff",
        paddingHorizontal: 15,
        borderRadius: 30,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "#6f6d62",
        padding: 15,
        marginLeft: 10,
        borderRadius: 30,
    },
    list: {
        flex: 1,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#4d4a48",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemText: {
        flex: 1,
        color: "#fff",
        fontSize: 18,
    },
});

export default ShoppingListScreen;
