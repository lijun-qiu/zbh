
<!--
  Version: 官网底部弹窗客户弹窗
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='customer-tips-box' v-if='customerPopFlag'>
    <img class="close"
         @click="close"
         src="public/officialWeb/home/close-white-icon.png" alt="">
    <div class='card'>
      <div class='title'>{{ popContentTitle }}</div>
      <div class='card-box'>
        <div class='person-icon'>
          <img class="icon" src="public/officialWeb/home/coutomer-head-icon.png" alt="">
        </div>
        <div class='text-box'>{{ popContentText }}</div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


const props = defineProps({
  pageFlag: { // 官网页面类型
    type: String,
    default: '1'
  }
})
const emit = defineEmits(['close'])
const customerPopFlag = ref(false) // 控制弹窗开关
const popContentTitle = computed(() => { // page类型对应标题
  const map = new Map([
    ['1', '信用示范专区有什么用？'],
    ['2', '用户如何在第一时间第一眼就看到你？'],
    ['3', '企业形象权威可信对成交率有什么影响？'],
    ['4', '企业形象权威可信对成交率有什么影响？'],
    ['1-1', '为什么要做中小企业老板都买得起的广告？'],
  ])
  return map.get(props.pageFlag)
});
const popContentText = computed(() => { // page类型对应消息内容
  const map = new Map([
    ['1', '每个有好信用的企业都值得拥有更多客户。在互联网时代，企业推广商品会去淘宝，企业推广网站会去百度，企业要树立自己的信用需要加入信用示范专区。'],
    ['2', '不用于广告投放，专区入口在与专区合作的APP中24小时随时在线，客户搜索你的企业时专区入口就在首页头部展示，让客户第一眼就看到你。'],
    ['3', '企业形象的权威与可信对成交率影响重大。直接关系到客户的信任感与的客户忠诚度，客户更倾向于与被认可和信任的企业的合作。'],
    ['4', '企业形象的权威与可信对成交率影响重大。直接关系到客户的信任感与的客户忠诚度，客户更倾向于与被认可和信任的企业的合作。'],
    ['1-1', '广告可以拓展市场份额、塑造品牌形象，推广新产品服务，有助于中小企业实现业务增长。信博汇要让有信用的企业都能低价、快捷，通过广告形式促进业务。'],
  ])
  return map.get(props.pageFlag)
});


/**
 * 关闭客服弹窗
 */
const close = () => {
  customerPopFlag.value = false
  emit('close');
};


/**
 * 打开客服弹窗
 */
const openCustomerPop = () => {
  setTimeout(() => {
    customerPopFlag.value = true
  },2000)
}


onMounted(() => {
  openCustomerPop()
});


onUnmounted(() => {

});


</script>

<style scoped lang='scss'>
.customer-tips-box{
  position: fixed;
  right: 40px;
  bottom: -200px;
  box-sizing: border-box;
  color: #7C530B;
  font-weight: 500;
  font-size: 15px;
  z-index: 99;
  animation: slide-up 0.8s forwards;
  @keyframes slide-up {
    0% {
      bottom: -200px;
    }
    100% {
      bottom: 15px;
    }
  }
  .close{
    position: absolute;
    right: 0;
    top: -30px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .card{
    width: 446px;
    min-height: 130px;
    border-radius: 10px;
    background-color: #F2E9D7;
    border: 1px solid #ECD0A3;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
    padding: 15px;
    box-sizing: border-box;
    .card-box{
      display: flex;
      margin-top: 10px;
      .person-icon{
        .icon{
          width: 38px;
          height: 38px;
        }
      }
      .text-box{
        flex: 1;
        margin-left: 14px;
        width: 72px;
        background-color: #FFFFFF;
        padding: 8px;
        box-sizing: border-box;
        color: #000000;
        font-weight: 400;
        font-size: 13px;
        border-radius: 6px;
      }
    }
  }
}
</style>