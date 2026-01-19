import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
import { useMainStore } from "@/stores/modules/main";

const mainStore = useMainStore()
class HYRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      config => {
        mainStore.isLoading = true
        return config
      },
      err => {
        return err
      }
    )
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        mainStore.isLoading = false
        resolve(res.data)
      }).catch(err => {
        mainStore.isLoading = false
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)

