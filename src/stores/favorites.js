import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [],
  }),
  persist: true,

  actions: {
    addFavorite(photoId) {
      if (!this.favorites.includes(photoId)) {
        this.favorites.push(photoId);
      }
    },

    removeFavorite(photoId) {
      this.favorites = this.favorites.filter(
        (favorite) => favorite !== photoId
      );
    },

    isFavorite(photoId) {
      return this.favorites.includes(photoId);
    },
  },
});
