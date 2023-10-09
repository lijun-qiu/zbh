<template>
  <div v-if="isShow">
      <popup :isShow="isShow" :closeOnClickOverlay="false">
        <div class="advertisement">
          <div class="logo">{{ short_name }}</div>
          <div v-if="closeShow" class="close" @click="closeAdvertisement(showContent)">
            <img src="~public/companyMobile/common/close.png" alt="">
          </div>
            <div v-if="!closeShow" class="backgroundself">{{countdown}} 企业自述</div>
            <div class="showAdvertisement_dsc" :style="{background:`${showContent.bg_color}`}">
             <div class="showAdvertisement_dsc1">{{ showContent.title }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[0]&&showContent.desc_list[0] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[1]&&showContent.desc_list[1] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[2]&&showContent.desc_list[2] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[3]&&showContent.desc_list[3] }}</div>
             <div class="popupimg"><img :src="cahngeSize(showContent.img_url,460,240)" alt=""></div>
            </div>
            <div class="showAdvertisement_btn">
              <span @click="knowMore(showContent)">了解更多</span>
              <span @click="contact">立即联系</span>
            </div>
        </div>
      </popup>
  </div>
</template>

<script setup>
import popup from '../../../components/popup'
import {cahngeSize} from './util'

const props = defineProps(['show','popup_ad_list','short_name','advertisementContent'])

const {show,popup_ad_list,short_name} = props || {}


let isShow = ref(false)
const showContent = ref(null)


watch(()=>props.show,(newVal)=>{
  // debugger
  if(newVal){
    countdown.value = ''
    showContent.value = props.advertisementContent
    isShow.value = true
  }else{
    countdown.value = ''
    showContent.value = null
    isShow.value = false
  }
})

//推荐业务
let countdown = ref(5) //倒计时
let randomAdv //随机数
let closeShow = ref(false)
let timer = ref(null)

const startAnimation = ()=>{
  if(countdown.value>0){
    timer = setTimeout(() => {
      countdown.value--
      startAnimation()
    }, 1000);
  }else{
    timer.value&&clearTimeout(timer.value)
    countdown.value = ''
    closeShow.value = true
    isShow.value = false
    emit('restart')
  }
}
 //开启动画
 const startAnimat = ()=>{
  if(!popup_ad_list || popup_ad_list?.length==0){
    return
  }
  // 随机选择其中一个
  const random =  Math.random()
  if(popup_ad_list.length>1){
    randomAdv = random < 0.5 ? popup_ad_list[0]  : popup_ad_list[1] 
  }else{
    randomAdv = popup_ad_list[0]
  }
  isShow.value = true
  showContent.value = randomAdv
  startAnimation()
}


const emit = defineEmits(['restart','callPhone'])

//了解更多
const knowMore = (item)=>{
  timer.value&&clearTimeout(timer.value)
  isShow.value = false
  countdown.value = ''
  emit('restart')
}
//立即联系
const contact = (item)=>{
  timer.value&&clearTimeout(timer.value)
  isShow.value = false
  countdown.value = ''
  emit('restart')
  emit('callPhone')
}

//广告关闭按钮
const closeAdvertisement = (item)=>{
  item.isShow = false

  emit('restart')
}

onMounted(() => {
  if(props.show){
    isShow.value = true
    showContent.value = props.advertisementContent
  }
  setTimeout(()=>{
    startAnimat()
  })
})
</script>

<style lang="scss" scoped>
 .advertisement{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      .close{
        position: absolute;
        right: 0;
        top: 0;
        width: 92px;
        height: 68px;
        border-radius: 0px 20px 0px 20px;
        background-color: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 68px;
        img{
          width: 30px;
          height: 30px;
        }
      }

      .logo{
        position: absolute;
        top: 18px;
        left: 44px;
        color: #FFFFFF;
        font-size: 36px;
      }
        .backgroundself{
          width: 210px;
          height: 68px;
          border-radius: 0px 20px 0px 20px;
          background: rgba(0,0,0,0.3);
          position: absolute;
          right: 0;
          top: 0;
          color: #EEEEEE;
          font-size: 32px;
          line-height: 68px;
          text-align: center;
        }
        .showAdvertisement_dsc{
          width: 1000px;
          height: 1260px;
          border-radius: 0px 20px 0px 20px;
          color: #FFFFFF;
          text-align: center;
          
          .showAdvertisement_dsc1{
            padding: 120px 0 36px 0;
            font-size: 72px;
          }
          .showAdvertisement_dsc2{
            font-size: 44px;
            padding-bottom: 12px;
          }

          .popupimg{
            width: 920px;
            height: 480px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            padding-top: 20px;
            img{
              width: 920px;
              height: 480px;
            }
          }

        }
 
        .showAdvertisement_btn{
          position: absolute;
          top: 1060px;
          width: 880px;
          margin: 0 60px;
          display: flex;
          justify-content: space-between;

          span{
            width: 420px;
            height: 120px;
            border-radius: 20px;
            background-color: rgba(255,255,255,0.1);
            border: 2px solid #FFFFFF;
            text-align: center;
            line-height: 120px;
            color: #FFFFFF;
            font-size: 40px;
            font-style: normal;
            text-decoration: none;
          }
          span:nth-child(2){
            background-color: #FFFFFF;
            color: #1F81F8;
          }
          span:active{
            opacity: 0.7;
          }
        }
      }
</style>