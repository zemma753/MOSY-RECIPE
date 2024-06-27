import axios from "axios";
import { SPOONACULAR_API_KEY } from "./Config";

const api = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

// Suche nach Rezepten anhand von Zutaten
export const findRecipesByIngredient = async (ingredients) => {
  try {
    const response = await api.get(`/findByIngredients`, {
      params: {
        ingredients: ingredients.join(","),
        number: 10,
        apiKey: SPOONACULAR_API_KEY,
      },
    });
    const recipeDetailsPromises = response.data.map(async (recipe) => {
      const detailsResponse = await getRecipeDetailsById(recipe.id);
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: detailsResponse.readyInMinutes,
      };
    });

    return await Promise.all(recipeDetailsPromises);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Abrufen von Rezeptdetails anhand der ID
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
        apiKey: SPOONACULAR_API_KEY,
        query: query,
        number: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes by name:", error);
    throw error;
  }
};

// Suche nach Rezepten anhand von Kategorien
export const findRecipesByCategory = async (category) => {
  try {
    const response = await api.get(`/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        type: category,
        number: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    throw error;
  }
};

export const getRandomRecipes = async () => {
  try {
    const response = await api.get("/random", {
      params: {
        number: 5, // Anzahl der zufälligen Rezepte
      },
    });
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    throw error;
  }
};

export const getIngredientImageUrl = (ingredient) => {
  return `https://spoonacular.com/cdn/ingredients_100x100/${ingredient}.jpg`;
};
