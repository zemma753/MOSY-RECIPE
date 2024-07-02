import axios from "axios";
import { SPOONACULAR_API_KEY } from "./Config";

const api = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  params: {
    apiKey: SPOONACULAR_API_KEY,
  },
});

const cache = {};

export const findRecipesByIngredient = async (ingredients) => {
  const cacheKey = ingredients.sort().join(",");
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  try {
    const response = await api.get(`/findByIngredients`, {
      params: {
        ingredients: ingredients.join(","),
        number: 20,
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

    const results = await Promise.all(recipeDetailsPromises);
    cache[cacheKey] = results;
    return results;
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
        includeNutrition: true,
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
        number: 30,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes by name:", error);
    throw error;
  }
};

export const findRecipesByCategory = async (category) => {
  try {
    const response = await api.get(`/complexSearch`, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        type: category,
        number: 20,
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
        number: 5,
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

export const findRecipesByFilter = async (filter) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          diet: filter.diet || undefined,
          intolerances: filter.intolerances || undefined,
          type: filter.type || undefined,
          maxReadyTime: filter.maxReadyTime || undefined,
          maxCalories: filter.maxCalories || undefined,
          number: 20,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching filtered recipes:", error);
    throw error;
  }
};
