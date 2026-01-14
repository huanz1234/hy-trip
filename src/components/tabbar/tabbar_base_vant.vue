// 基于vant的tabbar组件
<script setup>
import getAssetURL from '@/utils/load_img_url.js'
import { ref } from 'vue'

const tabBarList = [
  {
    text: '首页',
    image: 'tabbar/tab_home.png',
    imageActive: 'tabbar/tab_home_active.png',
    path: '/home',
  },
  {
    text: '收藏',
    image: 'tabbar/tab_favor.png',
    imageActive: 'tabbar/tab_favor_active.png',
    path: '/favor',
  },
  {
    text: '消息',
    image: 'tabbar/tab_message.png',
    // 消息图标不切换,因为没有图片资源
    imageActive: 'tabbar/tab_message.png',
    path: '/message',
  },
  {
    text: '订单',
    image: 'tabbar/tab_order.png',
    imageActive: 'tabbar/tab_order_active.png',
    path: '/order',
  },
]

const currentIndex = ref(0)
</script>

<template>
  <!-- 两种写法 -->
  <!-- <van-tabbar v-model="currentIndex" active-color="#ff9854">
    <van-tabbar-item v-for="(item, index) in tabBarList" :key="item.path" :to="item.path">
      <span>{{ item.text }}</span>
      <template #icon>
        <img
          :src="index === currentIndex ? getAssetURL(item.imageActive) : getAssetURL(item.image)"
        />
      </template>
    </van-tabbar-item>
  </van-tabbar> -->
  <van-tabbar v-model="currentIndex" active-color="#ff9854" :route="true">
    <van-tabbar-item v-for="(item, index) in tabBarList" :key="item.path" :to="item.path">
      <span>{{ item.text }}</span>
      <template #icon="props">
        <img :src="props.active ? getAssetURL(item.imageActive) : getAssetURL(item.image)" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
// 因为是插槽，所以直接可以选中img
// 否则需要使用deep选择器 或者使用全局自定义css变量 或者使用scoped css变量
.img {
  width: 30px;
}
</style>
