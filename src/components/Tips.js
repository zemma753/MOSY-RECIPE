import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const tips = [
  {
    id: "1",
    image: require("../../assets/obst.jpg"),
    text: "Store tomatoes at room temperature instead of in the refrigerator to prevent loss of flavor.",
  },
  {
    id: "2",
    image: require("../../assets/kraeuter.jpg"),
    text: "Store herbs in a glass of water in the refrigerator to extend their freshness.",
  },
  {
    id: "3",
    image: require("../../assets/brot.jpg"),
    text: "Use stale bread to make delicious croutons or a bread pudding.",
  },
  {
    id: "4",
    image: require("../../assets/bananen.jpg"),
    text: "Store bananas separately from other fruits as they release ethylene gas, which speeds up the ripening of other fruits.",
  },
  {
    id: "5",
    image: require("../../assets/kaese.jpg"),
    text: "Wrap cheese in wax paper before placing it in a plastic bag to keep it fresh longer.",
  },
  {
    id: "6",
    image: require("../../assets/ingredients/zwiebel.png"),
    text: "Store onions and garlic in a cool, dry place with good air circulation to prevent mold growth.",
  },
  {
    id: "7",
    image: require("../../assets/beeren.jpg"),
    text: "Wash berries in a vinegar solution before storing them to keep them fresh longer.",
  },
  {
    id: "8",
    image: require("../../assets/kartoffeln.jpg"),
    text: "Keep potatoes in a dark, cool place to prevent them from sprouting.",
  },
  {
    id: "9",
    image: require("../../assets/ingredients/eier.png"),
    text: "Store eggs in their original carton in the refrigerator to maintain their freshness.",
  },
  {
    id: "10",
    image: require("../../assets/pilze.jpg"),
    text: "Keep mushrooms in a paper bag in the refrigerator to extend their shelf life.",
  },
];

const Tips = () => {
  return (
    <View style={styles.tipsContainer}>
      <Text style={styles.tipsHeader}>Tips and tricks</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tipsScrollContainer}
        style={styles.tipsScrollView}
      >
        {tips.map((tip) => (
          <View key={tip.id} style={styles.tipCard}>
            <Image source={tip.image} style={styles.tipImage} />
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tipsContainer: {
    marginTop: 20,
  },
  tipsHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    alignSelf: "flex-start",
    paddingBottom: 10,
    marginStart: 20,
  },
  tipsScrollContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  tipsScrollView: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: "#353430",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 10,
    width: 250,
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
    elevation: 20,
    // borderWidth: 1,
    //borderColor: "#988e73",
  },
  tipImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  tipText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
});

export default Tips;
