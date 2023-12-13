<template>
  <header class="header">
    <div class="header__container container">
      <a href="/" class="header__logo">
        <img
          src="@/assets/img/icons/logo.svg"
          alt="Logo"
          width="186"
          height="73" />
      </a>

      <div class="header__nav">
        <a v-if="$route.path !== '/'" href="/" class="search">
          <button>
            <SearchIcon />
          </button>
          <span>Поиск</span>
        </a>
        <a href="/favorites" class="favorites">
          <button>
            <FavoriteWhiteIcon />
          </button>
          <span>Избранное</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
  import FavoriteWhiteIcon from "@/ui/FavoriteWhiteIcon.vue";
  import SearchIcon from "@/ui/SearchIcon.vue";
</script>

<style lang="scss" scoped></style>
