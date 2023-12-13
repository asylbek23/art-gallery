<template>
  <div id="home">
    <div class="hero">
      <div class="container">
        <div class="hero__search">
          <input
            type="text"
            placeholder="Поиск"
            v-model="searchQuery"
            @keyup.enter="handleSearch" />
          <button class="btn-search" @click="handleSearch">
            <SearchDarkIcon />
          </button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="images">
        <router-link
          v-for="photo in images"
          :key="photo.id"
          :to="{ name: 'photo', params: { id: photo.id } }"
          class="image-container">
          <img :src="photo.urls.small" :alt="photo.description" />
        </router-link>
      </div>

      <div class="loading" v-if="isLoading">
        <img
          src="@/assets/img/icons/spinner.webp"
          alt="spinner"
          width="80"
          height="80" />
      </div>
    </div>

    <div class="pageup" v-show="isPageUpVisible" @click="scrollToTop">
      <img src="@/assets/img/icons/top.svg" alt="top" width="50" height="50" />
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, onUnmounted } from "vue";
  import { getRandomPhotos, searchPhotos } from "../api";

  import SearchDarkIcon from "@/ui/SearchDarkIcon.vue";

  const images = ref([]);
  const searchQuery = ref("");
  const isLoading = ref(false);
  const currentPage = ref(1);
  const loadCount = ref(0);
  const isPageUpVisible = ref(false);

  onMounted(async () => {
    window.addEventListener("scroll", handleScroll);
    images.value = await getRandomPhotos();
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  const loadMorePhotos = async () => {
    if (!isLoading.value && loadCount.value < 3) {
      isLoading.value = true;
      currentPage.value += 1;
      loadCount.value += 1;

      try {
        const newPhotos = searchQuery.value
          ? await searchPhotos(searchQuery.value, currentPage.value)
          : await getRandomPhotos(currentPage.value);

        images.value = [...images.value, ...newPhotos];
      } catch (error) {
        console.error("Ошибка при загрузке новых фото:", error);
      } finally {
        isLoading.value = false;
      }
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    isPageUpVisible.value = scrollTop > 500;

    // Проверяем, достиг ли пользователь конца страницы
    if (scrollTop + clientHeight >= scrollHeight - 5 && loadCount.value < 3) {
      loadMorePhotos();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async () => {
    if (searchQuery.value) {
      isLoading.value = true;
      currentPage.value = 1; // Сбрасываем номер страницы
      loadCount.value = 0;
      images.value = await searchPhotos(searchQuery.value, currentPage.value);
      isLoading.value = false;
    }
  };
</script>

<style lang="scss" scoped></style>
