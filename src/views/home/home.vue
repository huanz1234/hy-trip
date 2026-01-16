<script setup>
import { onMounted, watch } from 'vue'
import HomeNavBar from './components/home-nav-bar.vue'
import HomeSearchBox from './components/home-search-box.vue'
import HomeCategories from './components/home-categories.vue'
import HomeContent from './components/home-content.vue'
import { useHomeStore } from '@/stores/modules/home'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
// import useScroll from '@/hooks/useIntersectionObserver'

// const { isReachBottom } = useScroll()
// watch(isReachBottom, (value) => {
//     if (value) {
//         console.log('滚动到底部了')
//         homeStore.getHouselistData()
//         isReachBottom.value = false
//     }
// })

const homeStore = useHomeStore()

// 新写法：hook 只提供 isIntersecting，由这里用 watch 管理回调
const { targetRef: loadMoreRef, isIntersecting } = useIntersectionObserver({
    root: null,
    threshold: 0.1,
})

watch(isIntersecting, (value) => {
    if (value) {
        console.log('滚动到底部了')
        homeStore.getHouselistData()
    }
})

// 分层架构,关于home页面的网络请求全部在此处请求
onMounted(() => {
    homeStore.getHomeHotSuggestsAction()
    homeStore.getHomeCategoriesAction()
    homeStore.getHouselistData()
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
        <HomeContent></HomeContent>
        <div ref="loadMoreRef"></div>
    </div>
</template>

<style lang="less" scoped>
.home {
    padding-bottom: 60px;
}
.banner {
    img {
        width: 100%;
    }
}
</style>
