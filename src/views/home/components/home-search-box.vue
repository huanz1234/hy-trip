<script></script>

<template>
  <div class="search-box">
    <div class="location">
      <div class="city" @click="jumpToCity">北京</div>
      <div class="position" @click="handleClickLocation">
        <span class="position-text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const jumpToCity = () => {
  router.push('/city')
}

const handleClickLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      // 根据百度地图API逆解析位置信息（通过本地代理转发，避免 CORS）
      //   const url = `/baidu-api/reverse_geocoding/v3/?ak=你的AK&location=${position.coords.latitude},${position.coords.longitude}&output=json`
      //   fetch(url)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data)
      //       // 解析出城市名称
      //       const city = data.result.addressComponent.city
      //       // 更新城市名称
      //       document.querySelector('.city').textContent = city
      //     })
    },
    (error) => {
      console.log(error)
    }
  )
}
</script>

<style lang="less" scoped>
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
    width: 74px;
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
