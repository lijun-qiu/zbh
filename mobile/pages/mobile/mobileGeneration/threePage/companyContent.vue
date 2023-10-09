<template>
  <div>
    <div class="companyinfo">
          <div class="companyinfo_detail" v-for="(item,index) in companyInfoList" :key="index">
            <span>
              <img v-if="index==0" src="~public/companyMobile/common/infoicon1.png" alt="">
              <img v-if="index==1" src="~public/companyMobile/common/infoicon2.png" alt="">
              <img v-if="index==2" src="~public/companyMobile/common/infoicon3.png" alt="">
              <img v-if="index==3" src="~public/companyMobile/common/infoicon4.png" alt="">
            </span>
            <span class="companyinfo_detail_dsc">
              <span>{{ item.title }}</span>
              <span class="text">{{ item.detaile }}</span>
            </span>
            <span class="companyinfo_detail_dsc2" v-if="index==0"><a ref="callphone"  :href="'tel:' + phoneNumber">拨打电话</a></span>
            <span class="gomore" v-if="index==1&&iumpShow" @click="gomore"><img src="~public/companyMobile/common/gomore.png" alt=""></span>
          </div>
        </div>
        <div class="recommendservice">
          <div class="title"><span>推荐业务</span><span class="companyself">企业自述</span></div>
          <div class="recommendservice_box">
              <div class="recommendservice_center">
                <div class="recommendservice_active" :style="{ backgroundImage: `url( ${cdnURL+item.img} )`}" v-for="(item,index) in advertisementList" :key="index" @click="showAdvertisement(item)">

                  <span class="title">{{ item.title }}</span>
                </div>
              </div>
            </div>
        </div>
        <div class="companyperson" v-for="(item,index) in companyContact" :key="index">
            <div class="title">企业联系人</div>
            <div class="companyperson_detail">
              <div><img :src="`${cdnURL + item.titleImg}`" alt=""></div>
              <div class="companyperson_detail2">
                <span>{{ item.name }}</span>
                <span>{{ item.job }}</span>
              </div>
              <div class="weixin"><a :href="'tel:' + phoneNumber">拨打电话</a></div>
            </div>
        </div>

      <!-- 跳转页面弹框 -->
      <popup :isShow="netProp" @bgClosePopup="closePopupNet">
        <div class="netProp" >
          <div>即将离信博汇前往其他网站</div>
          <div><span @click="cancle">取消访问</span><span @click="confirm">继续访问</span></div>
        </div>
      </popup>
     

    <!-- 广告弹窗 -->
     <advertisementPopup :type="advertisementType" :advertisementImgs="advertisementImgs" :companyLog="companyLog" @restart="restart" @callPhone="callPhone"></advertisementPopup>
  </div>
</template>

<script setup>

import advertisementPopup from './advertisementPopup.vue'

const props = defineProps(['advertisementList','companyInfoList','companyContact','advertisementImgs','companyLog'])

const {advertisementList,companyInfoList,companyContact,advertisementImgs,companyLog} = props || {}

//移动端去掉跳转
let iumpShow = ref(false)

const config = useRuntimeConfig()

let cdnURL = config.public.cdnURL

cdnURL += '/shuidi/images/companyMobile2'

const phoneNumber = companyInfoList[0]?.detaile || ''
const netaddress = companyInfoList[1]?.detaile ||''
let netProp = ref(false)
const gomore = ()=>{
  netProp.value = true
  document.body.style.overflow = 'hidden'
}


const confirm = ()=>{
  netProp.value = false
  document.body.style.overflow = 'auto'

  location.href = netaddress
}
const cancle = ()=>{
  netProp.value = false
  document.body.style.overflow = 'auto'
}



const closePopupNet = ()=>{
  netProp.value = false
}


//广告弹窗
let advertisementType = ref('')
const callphone = ref(null)

const showAdvertisement = (item)=>{
  item.type==='1'?advertisementType.value = '1' : advertisementType.value = '2'
}
const restart = ()=>{
  advertisementType.value = ''
}
const callPhone = ()=>{
  callphone.value[0].click()
}
</script>

<style lang="scss" scoped>
.companyself{
    color: #C7C7C7;
    font-size: 30px;
  }
.companyinfo{
        padding-top: 240px;
        background: #ffffff;
        .companyinfo_detail{
          display: flex;

          img{
            width: 56px;
            height: 56px;
            margin-left: 40px;
          }

          .companyinfo_detail_dsc{
            margin-left: 28px;
            color: #343434;
            font-size: 40px;
            margin-bottom: 56px;
            span:nth-child(2){
              margin-left: 20px;
              color: #343434 !important;
            }
            .text{
              text-decoration: none;
              color: inherit;
            }
          }
          .companyinfo_detail_dsc2{
            color: #3966FF;
            font-size: 40px;
            position: absolute;
            right: 40px;
            a{
              text-decoration: none;
              color: inherit;
            }
          }
          .gomore{
            position: absolute;
            right: 45px;
          }
          .gomore:active{
            opacity: 0.7;
          }
        }
      }
      .recommendservice{
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 28px;
        padding: 0 40px;
        position: relative;
        .title{
          padding-top: 26px;
          padding-bottom: 26px;
          color: #000000;
          font-weight: 1000px;
          font-size: 52px;
          display: flex;
          justify-content: space-between;
        }

        .recommendservice_box{
          .recommendservice_center{
            display: flex;
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none; 
            -ms-overflow-style: none;
            margin-bottom: 40px;
            div{
              width: 640px;
              height: 180px;
              border-radius: 20px;
              text-align: center;
              line-height: 180px;
              flex-shrink: 0;
            }
            div:nth-child(1){
              background-size: 100% 100%;
              color: #FFFFFF;
            }
            div:nth-child(2){
              background-size: 100% 100%;
              color: #3E3E3E;
              margin-left: 26px;
            }
          }
          .recommendservice_center::-webkit-scrollbar {
            display: none; 
          }
          .recommendservice_active{
            .title{
              display: inline-block;
              color: #FFFFFF;
              font-size: 48px;
              width: 640px;
              text-align: center;
              line-height: 120px;
            }
          }
          .recommendservice_active:active{
            opacity: 0.7;
          }
        }
        
      }
      .companyperson{
        padding: 0 40px;
        background: #ffffff;
        margin-top: 28px;

        .title{
         padding-top: 40px;
          color: #000000;
          font-weight: 1000px;
          font-size: 52px;
          margin-bottom: 42px;
        }

        .companyperson_detail{
          display: flex;
          color: #343434;
          font-weight: 800px;
          font-size: 44px;
          padding-bottom: 52px;
          img{
            width: 180px;
            height: 180px;     
          }
          span{
            margin-bottom: 16px;
          }
          .companyperson_detail2{
            display: flex;
            flex-direction: column;
            margin-left: 36px;
          }
        }
        .weixin{
          width: 560px;
          text-align: right;
          margin-top: 50px;
          font-weight: 800px;
          color: #3966FF;
          font-size: 40px;
          right: 40px;
          a{
            text-decoration: none;
            color: inherit;
          }
        }
      }

      .netProp{
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 920px;
      height: 344px;
      border-radius: 20px;
      background-color: #FFFFFF;
      box-shadow: 4px 4px 8px 4px rgba(0,0,0,0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 20;
      
      div:nth-child(1){
        color: #000000;
        font-weight: 1000px;
        font-size: 48px;
      }
      div:nth-child(2){
        width: 650px;
        margin-top: 88px;
        color: #3966FF;
        font-weight: 800px;
        font-size: 48px;
        display: flex;
        justify-content: space-between;
      }
    }
    .weixinimg{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 920px;
        height: 580px;
        border-radius: 20px;
        background-color: #FFFFFF;
        box-shadow: 4px 4px 8px 4px rgba(0,0,0,0.5);
        z-index: 20;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        text-align: center;
        img{
          width: 360px;
          height: 360px;
          margin: 0 auto;
          margin-top: 40px;
        }
      }
</style>