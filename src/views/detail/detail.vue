<template>
    <div class="detail top-page" ref="detailRef">
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <DetailSwipe :swipe-data="mainPart.topModule.housePicture.housePics" />
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { getDetailInfos } from '@/service/modules/details'
import DetailSwipe from '@/views/detail/components/detail_01-swipe.vue'

const route = useRoute()
const houseId = route.params.houseId
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
onMounted(() => {
    getDetailInfos(houseId).then((res) => {
        detailInfos.value = res.data
        console.log(detailInfos.value)
    })
})

const router = useRouter()
//添加onClickLeft函数处理左侧返回按钮点击事件
function onClickLeft() {
    router.back()
}
</script>

<style lang="less" scoped>
.detail {
    --van-nav-bar-icon-color: var(--color-primary);
    --van-nav-bar-text-color: var(--color-primary);
}
</style>
