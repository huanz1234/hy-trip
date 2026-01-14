<script setup>
import TabBar from '@/components/tabbar/tabbar_base_vant.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<style scoped></style>
