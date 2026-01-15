import Hyrequest from '@/service/request'

export function getCityList() {
    return Hyrequest.get({
        url: "/api/city/all",
    })
}

