import hyRequest from '../request'

export function getDetailInfos(houseId) {
    return hyRequest.get({
        url: "/api/detail/infos",
        params: {
            houseId
        }
    })
}
