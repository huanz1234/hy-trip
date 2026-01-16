<script setup>
import { computed } from 'vue'
import { useCityStore } from '@/stores/modules/city'
import { useRouter } from 'vue-router'
const props = defineProps({
    cityGroup: {
        type: Object,
        default: () => ({}),
    },
})

const indexList = computed(() => {
    const indexList = props.cityGroup.cities.map((item) => item.group)
    indexList.unshift('#')
    return indexList
})

const cityStore = useCityStore()
const router = useRouter()
const handleClick = (city) => {
    cityStore.currentCity = city
    cityStore.isUserSelected = true
    router.back()
}
</script>
<template>
    <div class="city-group">
        <van-index-bar :index-list="indexList">
            <!-- 热门城市 -->
            <van-index-anchor index="热门" />
            <!-- 热门城市列表 -->
            <div class="list">
                <template v-for="city in cityGroup.hotCities" :key="city.cityId">
                    <div class="city" @click="handleClick(city)">{{ city.cityName }}</div>
                </template>
            </div>

            <!-- 城市索引栏 -->
            <template v-for="item in cityGroup.cities" :key="item.group">
                <van-index-anchor :index="item.group" />
                <template v-for="city in item.cities" :key="city.cityId">
                    <van-cell :title="city.cityName" @click="handleClick(city)" />
                </template>
            </template>
        </van-index-bar>
    </div>
</template>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        color: #000;
        text-align: center;
        line-height: 28px;
        background-color: #fff4ec;
        margin: 6px 0;
    }
}
</style>
