<script setup>

</script>

<template>
    <div class="container">
        <router-view></router-view>
        <router-link to="/home">首页</router-link>
        <router-link to="/order">订单</router-link>
        <router-link to="/message">消息</router-link>
        <router-link to="/favor">收藏</router-link>
    </div>
</template>

<style scoped></style>
