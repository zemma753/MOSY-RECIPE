import axios from "axios";
import { SPOONACULAR_API_KEY } from "./Config";

const api = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

export const findRecipesByIngredient = async (ingredients) => {
  try {
    const response = await api.get(`/findByIngredients`, {
      params: {
        ingredients: ingredients.join(","),
        number: 10,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeDetailsById = async (id) => {
  try {
    const response = await api.get(`/${id}/information`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    throw error;
  }
};

export const findRecipesByName = async (query) => {
  try {
    const response = await api.get(`/complexSearch`, {
      params: {
        query: query,
        number: 10,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes by name:", error);
    throw error;
  }
};

export const getRandomRecipes = async () => {
  try {
    const response = await api.get("/random", {
      params: {
        number: 5, // Anzahl der zufälligen Rezepte
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    throw error;
  }
};
