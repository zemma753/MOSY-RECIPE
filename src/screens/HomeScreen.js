import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const MyComponent = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

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
        />
      </View>

      <View style={styles.middleContainer}>
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
            >
              <Text style={styles.text}> Kalorienreiche Lasagne</Text>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsHeader}>Tipps und Tricks</Text>

        <View style={styles.tipOfTheDay}>
          <Image
            source={require("../../assets/obst.jpg")}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            Tomaten nicht im Kühlschrank aufbewahren, da sie so schneller an Geschmack verlieren. Lagere sie bei Raumtemperatur.
          </Text>
        </View>

        <Text style={styles.tipsSubheader}>Weitere Tipps:</Text>

        <View style={styles.slideShow}>
          <Text style={styles.tipText}>
            Kräuter in einem Glas Wasser im Kühlschrank aufbewahren, um ihre Frische zu verlängern.
          </Text>
          <Text style={styles.tipText}>
            Mit altem Brot lassen sich köstliche Croutons oder ein Brotauflauf zaubern.
          </Text>
          <Text style={styles.tipText}>
            Bewahre Bananen getrennt von anderem Obst auf, da sie Ethylen abgeben und das Reifen anderer Früchte beschleunigen.
          </Text>
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
  topContainer: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 0,
    paddingBottom: 0,
    borderWidth: 2,
    borderColor: "black",
    height: 60,
    borderRadius: 6,
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontColor: " #6f6d62",
  },
  middleContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingTop: 1,
  },
  bottomContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingTop: 1,
  },
  text: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 60,
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
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 30,
  },
  itemImage: {
    width: 250,
    height: 170,
    resizeMode: "cover",
  },
  tipsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#4d4a48",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  tipOfTheDay: {
    marginBottom: 20,
  },
  tipImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: "#fff",
  },
  tipsSubheader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  slideShow: {
    marginBottom: 20,
  },
});
