import Hyrequest from '@/service/request'

export function getHomeHotSuggests() {
    return Hyrequest.get({
        url: "/api/home/hotSuggests"
    })
}

export function getHomeCategories() {
    return Hyrequest.get({
        url: "/api/home/categories"
    })
}

const url = "https://restapi.amap.com/v3/geocode/regeo?parameters"
const key = "a40f319c396e71a8f66e758d6fab19e8"
export function getPlacebyGeo(location) {
    return Hyrequest.get({
        url,
        params: {
            key,
            location,
            radius: 1000,
            extensions: "all"
        }
    })
}

export function getHomeHouselist(page) {
    return Hyrequest.get({
        url: "/api/home/houselist",
        params: {
            page
        }
    })
}