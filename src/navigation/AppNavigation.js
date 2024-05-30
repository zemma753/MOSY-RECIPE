import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import StartScreen from "../screens/StartScreen";
import VorratScreen from "../screens/VorratScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      inactiveColor="gray"
      barStyle={{ backgroundColor: "#CCFFCC" }}
      shifting={false}
      sceneContainerStyle={{ backgroundColor: "#ffffff" }}
    >
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
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Vorrat"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
        component={VorratScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
