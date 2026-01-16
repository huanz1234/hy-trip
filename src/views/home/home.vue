<script setup>
import { onMounted } from 'vue'
import HomeNavBar from './components/home-nav-bar.vue'
import HomeSearchBox from './components/home-search-box.vue'
import HomeCategories from './components/home-categories.vue'
import { useHomeStore } from '@/stores/modules/home'
const homeStore = useHomeStore()

// 分层架构,关于home页面的网络请求全部在此处请求
onMounted(() => {
    homeStore.getHomeHotSuggestsAction()
    homeStore.getHomeCategoriesAction()
})
</script>

<template>
    <div class="home">
        <HomeNavBar></HomeNavBar>
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="" />
        </div>
        <HomeSearchBox></HomeSearchBox>
        <HomeCategories></HomeCategories>
    </div>
</template>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}
</style>
