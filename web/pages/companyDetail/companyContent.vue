<template>
  <div>
    <div class="content_right">
          <div class="companyinfo">
            <div class="title"><span>基本信息</span><span class="companyself">企业自述</span></div>
            <div class="companyinfo_content">
              <div class="companyinfo_detail" v-for="(item,index) in new_base_info" :key="index">
                <span>
                  <img v-if="index==0" src="~public/companyMobile/common/infoicon1.png" alt="">
                  <img v-if="index==1" src="~public/companyMobile/common/infoicon2.png" alt="">
                  <img v-if="index==2" src="~public/companyMobile/common/infoicon3.png" alt="">
                  <img v-if="index==3" src="~public/companyMobile/common/infoicon4.png" alt="">
                </span>
                <span class="companyinfo_detail_dsc">
                  <span>{{ item.title }}</span>
                  <span>{{ item.detaile }}</span>
                </span>
              </div>
            </div>
          </div>
          <div class="recommendservice" v-if="popup_ad_list.length>0">
            <div class="title"><span>推荐业务</span><span class="companyself">企业自述</span></div>
              <div class="recommendservice_box">
                <div v-for="(item,index) in popup_ad_list" :key="index" @click="showAdvertisement(item)">
                 <div class="titleAndimg"   :style="{ background: item.bg_color}"> 
                  <span class="title">{{ item.title }}</span>
                </div>
                </div>
              </div>
          </div>
          <div  v-if="contact_person_list.length>0">
            <div class="companyperson" v-for="(item,index) in contact_person_list" :key="index">
              <div class="title"><span>企业联系人</span><span class="companyself">企业自述</span></div>
              <div class="companyperson_detail">
                <div><img :src="`${item.avatar_url}`" alt=""></div>
                <div class="companyperson_detail2">
                  <span>{{ item.name }}</span>
                  <span>{{ item.job }}</span>
                  <div class="weixinicon">
                    <div><img src="~public/companyMobile/common/phone-icon.png" alt="">{{item.phone}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="company_announcement" v-if="company_announce">
            <div class="title"><span>企业公告</span><span class="companyself">企业自述</span></div>
            <div class="company_announcement_detail" v-html="dealBr(company_announce)"> </div>
          </div>
        </div>
        <!-- 广告弹窗 -->
        <advertisementPopup :show="advertisementType" :advertisementContent="advertisementContent" :short_name="info.short_name" :popup_ad_list="popup_ad_list" @restart="restart"/>
  </div>
</template>

<script setup>
import advertisementPopup from './advertisementPopup.vue'
import {dealBr} from './util'

const props = defineProps(['info'])

const {company_announce,base_info,popup_ad_list,contact_person_list} = props.info || {}

//基本信息处理
const new_base_info = []
const baseMap = {phone:'认证电话',website:'认证网址',email:'认证邮箱',address:'企业地址'}
for(let key in base_info){
  if(key!=='logo'){
    new_base_info.push({title:baseMap[key],detaile:base_info[key]})
  }
}


//广告弹窗
let advertisementType = ref(false)
const advertisementContent = ref(null)

const showAdvertisement = (item)=>{
  advertisementContent.value = item
  advertisementType.value = true
}
const restart = ()=>{
  advertisementType.value = false
}



</script>

<style lang="scss" scoped>
  .companyself{
      color: #C7C7C7 !important;
      font-size: 15PX !important;
    }
   
  .content_right{
        width: 296PX;
        margin-left: 14PX;
        margin-top: -50PX;
        .companyinfo{
          width: 296PX;
          border-radius: 0PX 10PX 0PX 0PX;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 0 16PX;
          color: #343434;
          font-weight: 400PX;
          font-size: 16PX;
          font-style: normal;
          text-decoration: none;
          text-align: left;
          .title{
            color: #000000;
            font-weight: 500PX;
            font-size: 20PX;
            font-style: normal;
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            padding-top: 12PX;
          }

          .companyinfo_detail{
            display: flex;
            img{
              width: 28PX;
              height: 28PX;
              margin-top: 27PX;
            }
            span:nth-child(2){
              display: flex;
              flex-direction: column;
              color: #343434;
              font-weight: 400PX;
              font-size: 16PX;
              font-style: normal;
              text-decoration: none;
              text-align: left;
              span:nth-child(2){
                margin-top: 5PX;
              }
            }

            .companyinfo_detail_dsc{
              margin-top: 17PX;
              color: #343434;
              font-weight: 400PX;
              font-size: 16PX;
              font-style: normal;
              text-decoration: none;
              text-align: left;
              margin-left: 11PX;
            }
          }
          .companyinfo_detail:last-child{
            padding-bottom: 17PX;
          }
        }

        .recommendservice{
          width: 296PX;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 0 16PX;
          margin-top: 14PX;
          padding-bottom: 22PX;
          .title{
            color: #000000;
            font-weight: 500PX;
            font-size: 20PX;
            font-style: normal;
            text-decoration: none;
            text-align: left;
            display: flex;
            justify-content: space-between;
            padding: 12PX 0 17PX 0;
          }

          .recommendservice_box{
            div{
              width: 100%;
              height: 90PX;
              border-radius: 10PX;
              text-align: center;
              line-height: 90PX;
            }
            div:nth-child(1){
              background-size: 100% 100%;
              color: #FFFFFF;
            }
            div:nth-child(2){
              background-size: 100% 100%;
              color: #3E3E3E;
              margin-top: 15PX;
            }

            .titleAndimg{
              position: relative;
              .title{
                width: 100%;
                display: inline-block;
                color: #FFFFFF;
                font-size: 22PX;
                text-align: center;
                line-height: 50PX;
              }
            }
            
          }
          .recommendservice_box:hover{
            cursor: pointer;
          }
        }
        .companyperson{
          width: 296PX;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 0 16PX;
          margin-top: 14PX;
          padding-bottom: 22PX;
          .title{
            color: #000000;
            font-weight: 500PX;
            font-size: 20PX;
            font-style: normal;
            text-decoration: none;
            text-align: left;
            display: flex;
            justify-content: space-between;
            padding-top: 12PX;
          }

          .companyperson_detail{
            margin-top: 17PX;
            display: flex;
            img{
              width: 90PX;
              height: 90PX;
              border-radius: 8PX;
            }
            div:nth-child(1){
              border-radius: 8PX;
            }
            .companyperson_detail2{
              display: flex;
              flex-direction: column;
              margin-left: 18PX;
              color: #343434;
              font-weight: 400PX;
              font-size: 16PX;
              font-style: normal;
              text-decoration: none;
              text-align: left;
              span:nth-child(2){
                margin-top: 4PX;
                margin-bottom: 10PX;
              }
              .weixinicon{
                color: #343434;
                font-weight: 400PX;
                font-size: 16PX;
                font-style: normal;
                text-decoration: none;
                text-align: left;
                img{
                  width: 24PX;
                  height: 24PX;
                  margin-right: 3PX;
                  position: relative;
                  top: 5PX;
                }
                .weixinicon:hover{
                  cursor: pointer;
                }
                .weixinhover{
                  width: 210PX;
                  height: 218PX;
                  background-color: #FFFFFF;
                  box-shadow: 0PX 2PX 4PX 0PX rgba(0,0,0,0.5);              
                  position: absolute;
                  margin-top: 16PX;
                  margin-left: -90PX;
                  img{
                    width: 180PX;
                    height: 180PX;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                  }
                }
              }

            }
          }
        }

        .company_announcement{
          width: 296PX;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 0 16PX;
          margin-top: 14PX;
          padding-bottom: 22PX;

          .title{
            color: #000000;
            font-weight: 500PX;
            font-size: 20PX;
            font-style: normal;
            text-decoration: none;
            text-align: left;
            display: flex;
            justify-content: space-between;
            padding-top: 12PX;
          }

          .company_announcement_detail{
            margin-top: 11PX;
            color: #343434;
            font-weight: 400PX;
            font-size: 16PX;
            line-height: 26PX;
            letter-spacing: 2PX;
            font-style: normal;
            text-decoration: none;
            text-align: justify;
          }
        }
      }
</style>