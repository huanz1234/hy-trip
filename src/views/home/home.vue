<script setup>
import HomeNavBar from './components/home-nav-bar.vue'
import HomeSearchBox from './components/home-search-box.vue'
</script>

<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeSearchBox></HomeSearchBox>
  </div>
</template>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>
