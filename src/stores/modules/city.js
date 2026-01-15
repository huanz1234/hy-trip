import { defineStore } from 'pinia'
import { getCityList } from '@/service'

export const useCityStore = defineStore('city', {
    state: () => ({
        allCities: {},
        currentCity: {
            cityName: '北京',
        },
    }),
    actions: {
        async getAllCities() {
            const res = await getCityList()
            this.allCities = res.data
        }
    }
})

// 通常不需要导出，组件中直接使用 useCityStore() 即可，为什么不需要导出
// 因为 useCityStore() 是一个函数，直接调用即可获取到 store 实例
// 不需要导出，防止在组件中引入多个 store 实例，导致状态管理混乱
// export default useCityStore
