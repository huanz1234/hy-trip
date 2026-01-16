import { defineStore } from 'pinia'
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from '@/service'

export const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        houselist: [],
        currentPage: 1,
    }),
    actions: {
        async getHomeHotSuggestsAction() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async getHomeCategoriesAction() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async getHouselistData() {
            const res = await getHomeHouselist(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})
