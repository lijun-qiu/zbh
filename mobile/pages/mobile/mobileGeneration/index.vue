<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <CustomComponent v-if="info2&&pageList[currentDom]" :key="pageList[currentDom]" :value="pageList[currentDom]" :browser="browser" :info2="info2" :payStates="payStates"/>
    </transition>
  </div>
</template>

<script setup>
import CustomComponent from './CustomComponent.vue';
import { ref, onMounted } from 'vue';

// 获取当前路由对象
const route = useRoute()

//判断来源
const {flow_source,id} = route.query
const source = flow_source || ''
let browser = ref('')

const config = useRuntimeConfig()

const getSource = (source)=>{
  switch (true) {
    case source == 'toutiao_h5':
      return '头条';
    case source == '360mobile':
      return '360浏览器';
    case source == 'wk':
      return '悟空搜索';
    case source == 'UCSearch' || source == 'UCSearchAlias':
      return 'UC浏览器';
    case source == 'KKSearch' || source == 'KKSearchAlias':
      return '夸克';
    default:
      return '';
  }
}

browser.value = getSource(source)

//动画当前页
let currentDom = ref(1)

const pageList = ref(['','page1','page2','page3','page4'])

let info2 = ref(null)
let states = ref(0) //  预览状态

let payStates = ref(0) //支付状态，1未支付，2已支付，3被认领

const getData = async()=>{
const {data,pending,error,refresh}  = await useFetch(config.public.apiBase + '/xinbohui_api/api/detail', {
      query: {
            action: 'detail_preview',
            id: id || '1'
      }
})


states.value = data?._rawValue?.status
info2.value = data?._rawValue?.data ?? {}

if(states.value==2){
   //下线了
   currentDom.value = 4
}
payStates.value = info2.value.preview_pay_status

}

const startAnimation = ()=>{
  let timeer = setInterval(()=>{
    if(currentDom.value<3){
      currentDom.value+=1
    }else{
      clearInterval(timeer)
    }
  },2000)
}

onMounted(() => {
  setTimeout(()=>{
    getData()
  })
  startAnimation()
});
</script>


<style lang="scss" scoped>
html{
  background: #f4f4f4;
}
.container {
  
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>