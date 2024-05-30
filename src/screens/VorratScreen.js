import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const VorratScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="white" size={25}></Ionicons>
        </TouchableOpacity>
        <Text style={styles.headerText}>Reste retten</Text>
      </View>
      <View style={styles.searchInput}>
        <Ionicons name="search-sharp" size={25} color="#6f6d62"></Ionicons>
        <TextInput
          placeholder="Nach Zutaten suchen"
          placeholderTextColor="#6f6d62"
          style={{ marginLeft: 15, fontSize: 18 }}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Häufig gesucht</Text>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Detail", { item: "Hackfleisch, gemischt" })
            }
          >
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Hackfleisch, gemischt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Detail", { item: "Karotte" })}
          >
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Karotte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Detail", { item: "Staudensellerie" })
            }
          >
            <Image
              source={require("../../assets/favicon.png")}
              style={styles.itemImage}
            />
            <Text style={styles.itemName}>Staudensellerie</Text>
          </TouchableOpacity>
          {/* Füge hier weitere Elemente hinzu */}
        </View>
      </ScrollView>
    </View>
  );
};

export default VorratScreen;

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
  backArrow: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
  searchInput: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    margin: 20,
    backgroundColor: "#4d4a48",
    borderRadius: 30,
  },

  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
    marginTop: 10,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  item: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: "#333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  itemName: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
});
