import { defineStore } from 'pinia'
import { getHomeHotSuggests, getHomeCategories } from '@/service'

export const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: []
    }),
    actions: {
        async getHomeHotSuggestsAction() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async getHomeCategoriesAction() {
            const res = await getHomeCategories()
            this.categories = res.data
        }
    }
})
