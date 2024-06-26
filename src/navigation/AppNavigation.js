import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import StartScreen from "../screens/StartScreen";
import VorratScreen from "../screens/VorratScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import RecipeDetailScreen from "../components/RecipeDetailScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import RezepteScreen from "../screens/RezepteScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { FavoritesProvider } from "../components/FavoritesContext";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Tab-Navigation für die Hauptscreens
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#252421"
      inactiveColor="#988e73"
      barStyle={{ backgroundColor: "#252421" }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Favorite"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="star" color={color} size={24} />
          ),
        }}
        component={FavoriteScreen}
      />
      <Tab.Screen
        name="Stock"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="kitchen" color={color} size={24} />
          ),
        }}
        component={VorratScreen}
      />
      <Tab.Screen
        name="Recipes"
        component={RezepteScreen}
        options={{
          tabBarLabel: "Recipes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigation = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecipeDetail"
            component={RecipeDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Recipes">
            {(props) => (
              <RezepteScreen
                {...props}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Favorite">
            {(props) => <FavoriteScreen {...props} favorites={favorites} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default AppNavigation;
