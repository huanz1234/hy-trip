<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useCityStore } from '@/stores/modules/city'
import { storeToRefs } from 'pinia'
import CityGroup from './components/city-group.vue'

const value = ref('')
const router = useRouter()
const cityStore = useCityStore()
const { allCities } = storeToRefs(cityStore)
const tabActive = ref('')
const contentRef = ref(null)

const onCancel = () => {
    router.back()
}
const onSearch = () => {
    console.log(value.value)
}

onMounted(async () => {
    await cityStore.getAllCities()
    console.log(allCities.value)
})

//当前选中的城市组
const currentGroup = computed(() => allCities.value[tabActive.value])

// 监听tabActive变化，滚动到顶部
watch(tabActive, async () => {
    await nextTick()
    if (contentRef.value) {
        contentRef.value.scrollTop = 0
    }
})
</script>

<template>
    <div class="city top-page">
        <!-- 加上取消按钮 -->
        <div class="top">
            <van-search
                v-model="value"
                placeholder="城市/区域/位置"
                shape="round"
                show-action
                @search="onSearch"
                @cancel="onCancel"
            />
            <van-tabs v-model:active="tabActive" color="var(--color-primary)">
                <van-tab :title="value.title" :name="key" v-for="(value, key, index) in allCities" :key="key"></van-tab>
            </van-tabs>
        </div>
        <div class="content" ref="contentRef">
            <!-- 切换tab渲染太慢，用v-show -->
            <template v-for="(value, key, index) in allCities" :key="key">
                <CityGroup v-show="tabActive === key" :city-group="value"></CityGroup>
            </template>
        </div>
    </div>
</template>

<style lang="less" scoped>
.city {
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
    .top {
        position: relative;
        z-index: 9;
    }
}
:deep(.van-search__action) {
    color: #343;
}
</style>
