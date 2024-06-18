import axios from "axios";
import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from "./Config";

const EDAMAM_API_URL = "https://api.edamam.com/search";

export const findRecipesByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(EDAMAM_API_URL, {
      params: {
        q: ingredient,
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
        from: 0,
        to: 10,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};
