<template>
  <div class="photo-page">
    <div class="container">
      <div class="photo-info">
        <div class="author-info">
          <img :src="authorAvatar" alt="author avatar" class="author-avatar" />
          <div class="author-details">
            <span class="author-name">{{ authorFullName }}</span>
            <span class="author-username">@{{ authorUsername }}</span>
          </div>
        </div>

        <div class="photo-buttons">
          <button class="favorite-btn" @click="toggleFavorite">
            <FavoriteIcon v-if="!store.isFavorite(photoId)" />
            <FavoriteIconFilled v-else />
          </button>
          <button class="download-btn" @click="downloadPhoto">
            <img
              src="@/assets/img/icons/download.svg"
              alt="download"
              width="26"
              height="23" />
            <span>Download</span>
          </button>
        </div>
      </div>

      <div class="photo-container">
        <img :src="photoUrl" alt="image" class="photo" />
      </div>
    </div>
  </div>

  <div class="photo-bg">
    <img :src="photoUrl" alt="image blur bg" width="100%" height="100%" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { getPhotoDetails } from "@/api";
  import { useFavoritesStore } from "@/stores/favorites";

  import FavoriteIcon from "@/ui/FavoriteIcon.vue";
  import FavoriteIconFilled from "@/ui/FavoriteIconFilled.vue";

  const route = useRoute();
  const photoId = route.params.id;
  const store = useFavoritesStore();

  const authorAvatar = ref("");
  const authorFullName = ref("");
  const authorUsername = ref("");
  const photoUrl = ref("");

  const toggleFavorite = () => {
    if (store.isFavorite(photoId)) {
      store.removeFavorite(photoId);
    } else {
      store.addFavorite(photoId);
    }
  };

  onMounted(async () => {
    const details = await getPhotoDetails(photoId);
    authorAvatar.value = details.user.profile_image.small;
    authorFullName.value = `${details.user.first_name} ${details.user.last_name}`;
    authorUsername.value = details.user.username;
    photoUrl.value = details.urls.regular;
  });

  const downloadPhoto = async () => {
    const imageSrc = photoUrl.value;
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    const downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "downloaded_image.jpg"; // Можете задать имя файла
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
</script>

<style lang="scss" scoped></style>
