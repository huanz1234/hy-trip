<script setup>
import { useRouter } from 'vue-router'
import { useCityStore } from '@/stores/modules/city'
import { useHomeStore } from '@/stores/modules/home'
import { ref, onMounted } from 'vue'
import { formatMonthDay, getDiffDays } from '@/utils/format_data'
import { getPlacebyGeo } from '@/service/modules/home'

const router = useRouter()
const jumpToCity = () => {
    router.push('/city')
}

const handleClickLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position)
            // 经度在前,纬度在后
            const location = `${position.coords.longitude},${position.coords.latitude}`
            console.log(location)
            getPlacebyGeo(location).then((res) => {
                console.log(res)
                if (res.status === '1') {
                    const district = res.regeocode.addressComponent.district
                    const city = res.regeocode.addressComponent.city
                    cityStore.myPosition = `${district}${city}`
                    if (!cityStore.isUserSelected) {
                        cityStore.currentCity.cityName = city
                    }
                }
            })
        },
        (error) => {
            console.log(error)
        }
    )
}
onMounted(() => {
    handleClickLocation()
})
// 位置相关
const cityStore = useCityStore()

// 日期相关
const nowDay = new Date()
const startday = ref(formatMonthDay(nowDay))
const newday = nowDay.setDate(nowDay.getDate() + 1)
const endDay = ref(formatMonthDay(newday))
const stayday = ref(1)

const show = ref(false)

// 确认选择日期
const onConfirm = (value) => {
    show.value = false
    const selectStartDate = value[0]
    const selectEndDate = value[1]

    startday.value = formatMonthDay(selectStartDate)
    endDay.value = formatMonthDay(selectEndDate)
    stayday.value = getDiffDays(selectStartDate, selectEndDate)
}

// 热门建议
const homeStore = useHomeStore()

// 点击搜索
// 开始搜索
const searchBtnClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startday.value,
            endDate: endDay.value,
            currentCity: cityStore.currentCity.cityName,
        },
    })
}
</script>

<template>
    <div class="search-box">
        <!-- 位置 -->
        <div class="location bottom-gray-line">
            <div class="city" @click="jumpToCity">{{ cityStore.currentCity.cityName }}</div>
            <div class="position" @click="handleClickLocation">
                <span class="position-text">{{ cityStore.myPosition }}</span>
                <img src="@/assets/img/home/icon_location.png" alt="" />
            </div>
        </div>

        <!-- 日期 -->
        <div class="section date-range bottom-gray-line" @click="show = true">
            <div class="start">
                <span class="tip">入住</span>
                <span class="time">{{ startday }}</span>
            </div>
            <div class="stay">共{{ stayday }}晚</div>
            <div class="end">
                <span class="tip">退房</span>
                <span class="time">{{ endDay }}</span>
            </div>
        </div>

        <!-- 日期选择器 -->
        <van-calendar v-model:show="show" type="range" @confirm="onConfirm" color="#ff9854" />

        <!-- 价格/人数选择 -->
        <div class="section price-counter bottom-gray-line">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <!-- 关键字 -->
        <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="hot-suggests">
            <template v-for="(item, index) in homeStore.hotSuggests" :key="index">
                <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="section search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.search-box {
    .section {
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px 0 20px;
        color: #999;
        flex-wrap: wrap;
        .start,
        .stay,
        .end {
            display: flex;
            flex-direction: column;
            // align-items: center;
            justify-content: center;
            .time {
                margin-top: 3px;
                color: #333;
                font-size: 15px;
                font-weight: 500;
            }
            .tip {
                font-size: 12px;
                color: #999;
            }
        }
        .stay {
            flex: 1;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    }

    .price-counter {
        .start {
            width: 50%;
            height: 100%;
            border-right: 1px solid var(--line-color);
        }
    }
}

.hot-suggests {
    margin: 10px 0;
    height: auto;
    display: flex;
    align-items: center;
    padding: 0 30px 0 20px;
    color: #999;
    flex-wrap: wrap;

    .item {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        font-size: 12px;
        line-height: 1;
    }
}

.search-btn {
    .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
    }
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 15px;
    }

    .position {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        .position-text {
            font-size: 12px;
            color: #333;
        }

        img {
            width: 18px;
            height: 18px;
            margin-left: 5px;
        }
    }
}
</style>
