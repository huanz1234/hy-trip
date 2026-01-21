<script setup>
import TabBar from '@/components/tabbar/tabbar_base_vant.vue'
import Loading from '@/components/loading/loading.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showTabBar = computed(() => !route.meta.hideTabBar)
</script>

<template>
    <div class="container">
        <router-view v-slot="props">
            <keep-alive include="home">
                <component :is="props.Component" />
            </keep-alive>
        </router-view>
        <TabBar v-if="showTabBar"></TabBar>
        <Loading></Loading>
    </div>
</template>

<style scoped></style>
