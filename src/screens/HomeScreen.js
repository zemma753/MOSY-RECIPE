import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const tips = [
  {
    id: '1',
    image: require("../../assets/obst.jpg"),
    text: "Tomaten nicht im Kühlschrank aufbewahren, da sie so schneller an Geschmack verlieren. Lagere sie bei Raumtemperatur."
  },
  {
    id: '2',
    image: require("../../assets/kraeuter.jpg"),
    text: "Kräuter in einem Glas Wasser im Kühlschrank aufbewahren, um ihre Frische zu verlängern."
  },
  {
    id: '3',
    image: require("../../assets/brot.jpg"),
    text: "Mit altem Brot lassen sich köstliche Croutons oder ein Brotauflauf zaubern."
  },
  {
    id: '4',
    image: require("../../assets/bananen.jpg"),
    text: "Bewahre Bananen getrennt von anderem Obst auf, da sie Ethylen abgeben und das Reifen anderer Früchte beschleunigen."
  }
];

const MyComponent = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    if (currentTipIndex < tips.length - 1) {
      setCurrentTipIndex(currentTipIndex + 1);
    }
  };

  const handlePrevTip = () => {
    if (currentTipIndex > 0) {
      setCurrentTipIndex(currentTipIndex - 1);
    }
  };

  const currentTip = tips[currentTipIndex];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recipe Saver</Text>
      </View>

      <View style={styles.searchInput}>
        <Ionicons name="search-sharp" size={25} color="#6f6d62" />
        <TextInput
          placeholder="Nach Rezepten suchen"
          placeholderTextColor="#6f6d62"
          style={{ marginLeft: 15, fontSize: 18 }}
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.recipeOfDay}> Rezept des Tages: </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RezepteScreen");
          }}
        >
          <View style={styles.imageContainer}>
            <ImageBackground
              source={require("../../assets/lasagne.jpg")}
              style={styles.itemImage}
              imageStyle={{ borderRadius: 30 }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tipps und Tricks</Text>
        <View style={styles.tipCard}>
          <Image source={currentTip.image} style={styles.tipImage} />
          <Text style={styles.tipText}>{currentTip.text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentTipIndex === 0 && styles.disabledButton
            ]}
            onPress={handlePrevTip}
            disabled={currentTipIndex === 0}
          >
            <Text style={styles.buttonText}>Zurück</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              currentTipIndex === tips.length - 1 && styles.disabledButton
            ]}
            onPress={handleNextTip}
            disabled={currentTipIndex === tips.length - 1}
          >
            <Text style={styles.buttonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MyComponent;

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
    paddingTop: 15,
    paddingStart: 10,
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
  middleContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingTop: 1,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 30,
    alignItems: 'center',
  },
  itemImage: {
    width: 250,
    height: 170,
    resizeMode: "cover",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recipeOfDay: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  tipsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#4d4a48",
    borderRadius: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: "#4d4a48",
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    maxWidth: 300, // Max width for the tip card
  },
  tipImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: "#fff",
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  navButton: {
    backgroundColor: "#6f6d62",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#9c9a93",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});