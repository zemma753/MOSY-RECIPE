import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();
const RecentlyViewedContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const addToRecentlyViewed = (recipe) => {
    setRecentlyViewed((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === recipe.id);
      if (existingIndex !== -1) {
        // Move the existing item to the front
        const updatedList = [...prev];
        updatedList.splice(existingIndex, 1);
        return [recipe, ...updatedList];
      }
      // Add new item to the front
      return [recipe, ...prev];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      <RecentlyViewedContext.Provider
        value={{ recentlyViewed, addToRecentlyViewed }}
      >
        {children}
      </RecentlyViewedContext.Provider>
    </FavoritesContext.Provider>
  );
};
