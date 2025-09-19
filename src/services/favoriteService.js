// services/favouriteService.js
import api from "./api";

// Get all favorites for current user
export const getFavorites = async () => {
  const res = await api.get("/favorites");
  return res.data; // backend returns fav.posts (array of populated posts)
};

// Add a post to favorites
export const addFavorite = async (postId) => {
  if (!postId) throw new Error("postId is required");
  const res = await api.post(`/favorites/add/${postId}`);
  return res.data; // { message, favorites }
};

// Remove a post from favorites
export const removeFavorite = async (postId) => {
  if (!postId) throw new Error("postId is required");
  const res = await api.post(`/favorites/remove/${postId}`);
  return res.data; // { message, favorites }
};

// Toggle helper
export const toggleFavorite = async (postId, isFav) => {
  return isFav ? removeFavorite(postId) : addFavorite(postId);
};
