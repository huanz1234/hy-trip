<script setup>
import TabBar from '@/components/tabbar/tabbar_base_vant.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showTabBar = computed(() => !route.meta.hideTabBar)
</script>

<template>
    <div class="container">
        <router-view></router-view>
        <TabBar v-if="showTabBar"></TabBar>
    </div>
</template>

<style scoped></style>
