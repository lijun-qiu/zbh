<template>
  <div v-if="isShow">
    <popup :isShow="isShow" :closeOnClickOverlay="false">
      <div class="advertisement">
        <div class="logo">{{ short_name }}</div>
        <div v-if="closeShow" class="close" @click="closeAdvertisement(showContent)"><img src="~public/companyMobile/common/close.png" alt=""></div>
        <div class="showAdvertisement" :style="{background:`${showContent.bg_color}`}">
        <div v-if="!closeShow" class="backgroundself">{{countdown}} 企业自述</div>
        <div class="showAdvertisement_content">
          <div class="left">
            <div class="showAdvertisement_dsc1">{{ showContent?.title }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[0]&&showContent.desc_list[0] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[1]&&showContent.desc_list[1] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[2]&&showContent.desc_list[2] }}</div>
             <div class="showAdvertisement_dsc2">{{ showContent.desc_list[3]&&showContent.desc_list[3] }}</div>
             <div class="showAdvertisement_button" @click="knowMore(item)">
                  了解更多
             </div>
          </div>
          <div class="line"></div>
          <div class="right">
            <img :src="cahngeSize(showContent.img_url,420,220)" alt="">
          </div>
        </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<script setup>
import popup from '../../components/popup'

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


const emit = defineEmits(['restart'])

//了解更多
const knowMore = (item)=>{
  timer.value&&clearTimeout(timer.value)
  isShow.value = false
  countdown.value = ''
  emit('restart')
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
  startAnimat()
})

</script>

<style lang="scss" scoped>
  .advertisement{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 20;
      border-radius: 10PX;
      .close{
        position: absolute;
        right: 0;
        top: 0;
        width: 46PX;
        height: 34PX;
        border-radius: 0PX 10PX 0PX 10PX;
        background-color: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 36PX;
        img{
          width: 15PX;
          height: 15PX;
        }
      }

      .logo{
        position: absolute;
        color: #FFFFFF;
        font-size: 18PX;
        top: 16PX;
        left: 21PX;
      }
    
      .close:hover{
        cursor: pointer;
      }
      .close:active{
        opacity: 0.7;
      }
      .showAdvertisement{
        width: 1020PX;
        height: 430PX;
        border-radius: 10PX;

        .backgroundself{
            width: 105PX;
            height: 34PX;
            border-radius: 0PX 10PX 0PX 10PX;
            background: rgba(0,0,0,0.3);
            position: absolute;
            top: 0;
            right: 0;
            color: #EEEEEE;
            font-weight: 400PX;
            font-size: 16PX;
            text-align: center;
            line-height: 34PX;
          }
        .showAdvertisement_content{
          display: flex;
          padding: 0 51PX;
          padding-top: 93PX;
          justify-content: space-between;

          .left{
            width: 450PX;
            text-align: center;
            .showAdvertisement_dsc1{
              color: #FFFFFF;
              font-size: 36PX;
              padding-bottom: 17PX;
            }
            .showAdvertisement_dsc2{
              font-size: 22PX;
              color: #FFFFFF;
              padding-bottom: 8PX;
            }

            .showAdvertisement_button{
              width: 200PX;
              height: 52PX;
              border-radius: 6PX;
              background-color: rgba(255,255,255,0.1);
              border: 1PX solid #FFFFFF;
              color: #FFFFFF;
              font-size: 16PX;
              line-height: 52PX;
              text-align: center;
              position: absolute;
              top: 320PX;
              left: 175PX;
            }

          }

          .line{
              width: 1PX;
              height: 180PX;
              border-right: 1PX solid #FFFFFF;
              margin-top: 20PX;
            }

            .right{
              width: 400PX;
              height: 220PX;
              img{
                width: 420PX;
              }
            }
        }

      
        .showAdvertisement_button:hover{
          cursor: pointer;
        }
        .showAdvertisement_button:active{
          opacity: 0.7;
        }
      }
    }
</style>