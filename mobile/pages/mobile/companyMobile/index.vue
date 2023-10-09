<template>
  <div class="page">
      <companyHeader v-if="info" :info="info"></companyHeader>
      <div class="content">
        <companyContent v-if="info" :info="info"></companyContent>
        <companyDescription v-if="info" :info="info"></companyDescription>
      </div>
      <companyFooter v-if="info"></companyFooter>

      <div class="loading" v-if="isLoading">
        <van-loading color="#0094ff" text-color="#0094ff" size="24px" vertical>加载中...</van-loading>
      </div>
  </div>
</template>

<script setup>
import companyHeader from './companyHeader.vue'
import companyContent from './companyContent.vue'
import companyDescription from './companyDescription.vue'
import companyFooter from './companyFooter.vue'
import usePingansec from '../../../hooks/usePingansec'

import {blockRolling} from './util'


const route = useRoute()
const { digest } = route.query
const config = useRuntimeConfig()

let info = ref(null)
const getData = async()=>{

const {data,pending,error,refresh}  = await useFetch(config.public.apiBase + '/xinbohui_api/api/detail', {
      query: {
            digest: digest
      }
})

info.value = data?._rawValue?.data ?? {}
isLoading.value = false

}


//移动访问打点
const {firePingansec} = usePingansec()

let isLoading = ref(false)//loading加载

onMounted(()=>{
  blockRolling()
  firePingansec(5335)

  setTimeout(()=>{
    isLoading.value = true
    getData()
  })
})

</script>

<style scoped lang="scss">
.page{
  width: 1080px;
  font-weight: 800px;
  font-style: normal;
  text-decoration: none;
  text-align: left;
  background-color: #f4f4f4;

  .loading{
    position: absolute;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%,-50%);
  }
  }
</style>
<style>
html {
  touch-action: manipulation;
}
body {
  margin: 0;
  overflow-x: hidden;
  touch-action: manipulation;
  touch-action: pan-x pan-y;
}
</style>