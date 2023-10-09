<template>
  <div class="page">
     <div class="main">
        <CompanyHeader v-if="info" :info="info" />

        <div class="content">
          <CompanyDescription v-if="info" :info="info" :digest="digest"/>

          <CompanyContent v-if="info" :info="info"/>
        </div>

        <CompanyFooter v-if="info"/>

        <div v-if="isLoading" class="loading">
          <a-spin tip="Loading..." />
        </div>
     </div>
  </div>

</template>

<script setup>
import CompanyHeader from './companyHeader.vue'
import CompanyFooter from './companyFooter.vue'
import CompanyContent from './companyContent.vue'
import CompanyDescription from './companyDescription.vue'
import usePingansec from '../../hooks/usePingansec'
const route = useRoute()
const config = useRuntimeConfig()
const { digest } = route.query


let info = ref(null)
const {firePingansec} = usePingansec()


const getData = async()=>{
  const {data,pending,error,refresh}  = await useFetch(
    config.public.apiBase + '/xinbohui_api/api/detail', {
        query: {
              digest: digest
        }
  })
  info.value = data?._rawValue?.data ?? {}
  isLoading.value = false
}

let isLoading = ref(false)//loading加载


onMounted(()=>{
  firePingansec(5334)
  isLoading.value = true
  setTimeout(()=>{
    getData()
  })
})


</script>


<style scoped lang="scss">
.page{
  .main{
    width: 100%;
    .companyself{
      color: #C7C7C7 !important;
      font-size: 15PX !important;
    }
   
    .content{
      background-color: #F8F8F8;
      display: flex;
      justify-content: center;

    }
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1001;
    transform: translate(-50%,-50%);
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4PX;
    margin-bottom: 20PX;
    padding: 30PX 50PX;
    margin: 20PX 0;
  }
}
</style>

<style>
body {
  margin: 0;
}
</style>