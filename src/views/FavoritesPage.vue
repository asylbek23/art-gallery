<template>
  <div class="favorites-page">
    <div class="container">
      <h1>Избранное</h1>

      <div class="images">
        <router-link
          v-for="photo in images"
          :key="photo.id"
          :to="{ name: 'photo', params: { id: photo.id } }"
          class="image-container">
          <img :src="photo.urls.small" :alt="photo.description" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { getFavoritePhotos } from "@/api";

  const images = ref([]);

  onMounted(async () => {
    images.value = await getFavoritePhotos();
  });
</script>

<style lang="scss" scoped>
  /* Ваши стили */
</style>
