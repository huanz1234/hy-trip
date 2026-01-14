<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const value = ref('')
const router = useRouter()
const onCancel = () => {
  router.back()
}
const onSearch = () => {
  console.log(value.value)
}
</script>

<template>
  <div class="city top-page">
    <!-- 加上取消按钮 -->
    <van-search
      v-model="value"
      placeholder="城市/区域/位置"
      shape="round"
      show-action
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<style lang="less" scoped>
.city {
}
:deep(.van-search__action) {
  color: #343;
}
</style>
