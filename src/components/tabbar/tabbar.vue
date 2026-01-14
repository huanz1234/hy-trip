<script setup>
import getAssetURL from '@/utils/load_img_url.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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

// 代码不生效，后面再看原因
// const getAssetURL = (image) => {
//     // 参数1：图片路径，相对路径
//     // 参数2：当前模块的 URL
//     // console.log(image)
//     // console.log(import.meta.url)
//     // console.log(new URL(`../../assets/img/${image}`, import.meta.url).href)
//     return new URL(`../../assets/img/${image}`, import.meta.url).href
// }

const currentIndex = ref(0)
const router = useRouter()
const handleClick = (index, item) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<template>
  <div class="tab-bar">
    <div
      v-for="(item, index) in tabBarList"
      :key="item.path"
      class="tab-bar-item"
      :class="{ active: index === currentIndex }"
      @click="handleClick(index, item)"
    >
      <img v-if="index !== currentIndex" :src="getAssetURL(item.image)" alt="" />
      <img v-else :src="getAssetURL(item.imageActive)" alt="" />
      <span class="tab-bar-item-text">{{ item.text }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;

    &.active {
      color: var(--color-primary);
    }

    .tab-bar-item-text {
      font-size: 12px;
      margin-top: 1px;
    }

    img {
      width: 36px;
      height: 28px;
    }
  }
}
</style>
