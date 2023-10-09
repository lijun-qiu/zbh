<template>
  <div>
    <div class="companyinfo">
          <div class="companyinfo_detail" v-for="(item,index) in new_base_info" :key="index">
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
          </div>
        </div>
        <div class="recommendservice" v-if="popup_ad_list?.length>0">
          <div class="title"><span>推荐业务</span><span class="companyself">企业自述</span></div>
          <div class="recommendservice_box">
              <div class="recommendservice_center">
                <div class="recommendservice_active"
                     :style="{ background: item.bg_color}"
                     v-for="(item,index) in popup_ad_list"
                     :key="index" @click="showAdvertisement(item)">
                  <span class="title">{{ item.title }}</span>
                </div>
              </div>
            </div>
        </div>
       <div v-if="contact_person_list?.length>0">
        <div class="companyperson" v-for="(item,index) in contact_person_list" :key="index">
            <div class="title">企业联系人</div>
            <div class="companyperson_detail">
              <div><img :src="`${item.avatar_url}`" alt=""></div>
              <div class="companyperson_detail2">
                <span>{{ item.name }}</span>
                <span>{{ item.job }}</span>
              </div>
              <div class="weixin">
                <span>
                  <a ref="callphone"  :href="'tel:' + item.phone">拨打电话</a>
                </span>
              </div>
            </div>
        </div>
       </div>

    <!-- 广告弹窗 -->
     <advertisementPopup :show="advertisementType" :advertisementContent="advertisementContent" :short_name="info.short_name" :popup_ad_list="popup_ad_list" @restart="restart" @callPhone="callPhone"></advertisementPopup>
  </div>
</template>

<script setup>
import advertisementPopup from './advertisementPopup.vue'

const props = defineProps(['info'])

const {base_info,popup_ad_list,contact_person_list} = props.info || {}

//基本信息处理
const new_base_info = []
let phoneNumber = ''
const baseMap = {phone:'认证电话',website:'认证网址',email:'认证邮箱',address:'企业地址'}
for(let key in base_info){
  if(key!=='logo'){
    if(key=='phone'){
      phoneNumber = base_info[key]
    }
    new_base_info.push({title:baseMap[key],detaile:base_info[key]})
  }
}


//广告弹窗
let advertisementType = ref(false)
const advertisementContent = ref(null)
const callphone = ref(null)

const showAdvertisement = (item)=>{
  advertisementContent.value = item
  advertisementType.value = true
}
const restart = ()=>{
  advertisementType.value = false
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
            border-radius: 16px;  
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
          text-align: right;
          margin-top: 50px;
          color: #3966FF;
          font-weight: 800px;
          font-size: 40px;
          flex: 1;
          a{
            color: inherit;
            text-decoration: none;
          }
        }
      }
</style>