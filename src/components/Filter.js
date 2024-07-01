import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

const FilterComponent = ({ setShowFilter, handleFilterPress }) => {
  const filterOptions = [
    { label: "Vegetarisch", icon: "leaf", type: "diet", value: "vegetarian" },
    { label: "Vegan", icon: "leaf", type: "diet", value: "vegan" },
    { label: "Fisch", icon: "fish-sharp", type: "type", value: "seafood" },
    { label: "Rind", icon: "cow", type: "type", value: "beef" },
    { label: "Low Carb", type: "diet", value: "low-carb" },
    { label: "Keto", type: "diet", value: "ketogenic" },
    {
      label: "Glutenfrei",

      type: "intolerances",
      value: "gluten",
    },
    {
      label: "High Protein",

      type: "diet",
      value: "high-protein",
    },
    { label: "under 10 Min", type: "maxReadyTime", value: 10 },
    { label: "under 20 Min", type: "maxReadyTime", value: 20 },
    { label: "under 5 Zutaten", type: "maxIngredients", value: 5 },
    { label: "under 300 calories", type: "maxCalories", value: 300 },
    { label: "under 400 calories", type: "maxCalories", value: 400 },
    { label: "under 500 calories", type: "maxCalories", value: 500 },
  ];

  const handleFilterSelect = (filterOption) => {
    const filter = { [filterOption.type]: filterOption.value };
    handleFilterPress(filter);
    setShowFilter(false);
  };

  return (
    <View style={styles.filterOverlay}>
      <View style={styles.filterHeader}>
        <TouchableOpacity onPress={() => setShowFilter(false)}>
          <Ionicons name="close" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.filterHeaderText}>Filter</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.topFilterContainer}>
          <Text style={styles.filterCategorieText}>Categories</Text>
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "diet", value: "vegetarian" })
              }
            >
              <Ionicons name="leaf" size={24} color="white" />
              <Text style={styles.filterOptionText}>vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "diet", value: "vegan" })
              }
            >
              <FontAwesome name="leaf" size={24} color="white" />
              <Text style={styles.filterOptionText}>Vegan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "type", value: "seafood" })
              }
            >
              <Ionicons name="fish-sharp" size={24} color="white" />
              <Text style={styles.filterOptionText}>Fish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "type", value: "beef" })
              }
            >
              <FontAwesome6 name="cow" size={24} color="white" />
              <Text style={styles.filterOptionText}>Beef</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#988e73",
              marginBottom: 20,
            }}
          ></View>
          <Text style={styles.filterCategorieText}>Nutrition</Text>
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "diet", value: "low-carb" })
              }
            >
              <Text style={styles.filterOptionText}>Low Carb</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "diet", value: "ketogenic" })
              }
            >
              <Text style={styles.filterOptionText}>Keto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "intolerances", value: "gluten" })
              }
            >
              <Text style={styles.filterOptionText}>Gluten free</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "diet", value: "high-protein" })
              }
            >
              <Text style={styles.filterOptionText}>High Protein</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 0.5,
              borderColor: "#988e73",
              marginBottom: 20,
            }}
          ></View>
          <Text style={styles.filterCategorieText}>Less is More</Text>
          <View style={styles.filterOptionsContainer}>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxReadyTime", value: 10 })
              }
            >
              <Text style={styles.filterOptionText}>under 10 Min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxReadyTime", value: 20 })
              }
            >
              <Text style={styles.filterOptionText}>under 20 Min</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxIngredients", value: 5 })
              }
            >
              <Text style={styles.filterOptionText}>under 5 Zutaten</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxCalories", value: 300 })
              }
            >
              <Text style={styles.filterOptionText}>under 300 calories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxCalories", value: 400 })
              }
            >
              <Text style={styles.filterOptionText}>under 400 calories</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterOption}
              onPress={() =>
                handleFilterSelect({ type: "maxCalories", value: 500 })
              }
            >
              <Text style={styles.filterOptionText}>under 500 calories</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#353430",
    padding: 20,
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: "#988e73",
  },
  filterHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
    marginBottom: 5,
  },
  scrollView: {
    marginTop: 20,
  },
  topFilterContainer: {
    marginTop: 20,
  },
  filterCategorieText: {
    fontSize: 28,
    color: "white",
    marginBottom: 10,
  },
  filterOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  filterOption: {
    backgroundColor: "#252421",
    borderRadius: 40,
    padding: 10,
    margin: 4,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    width: widthPercentageToDP(40),
    height: heightPercentageToDP(10),
  },
  filterOptionText: {
    color: "white",
    marginLeft: 10,
  },
});

export default FilterComponent;
