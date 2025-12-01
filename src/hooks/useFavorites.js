import { useEffect, useState } from "react";

const STORAGE_KEY = "gutendex_favorites";

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (prev.some((b) => b.id === book.id)) return prev;
      return [...prev, book];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((b) => b.id !== id));
  };

  const isFavorite = (id) => favorites.some((b) => b.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
