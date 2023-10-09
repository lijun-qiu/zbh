<template>
  <div>
    <div class="content_left">
          <div class="left_first" id="first" :key="index">
            <span><span>公司简介</span><span class="companyself">企业自述</span></span>
            <span v-html="dealBr(intro)"></span>
          </div>
          <div class="left_second">
            <div v-for="(item,index) in new_custom_content_list" :key="index">
              <div class="left_second1" v-if="item.type==='1'" :id="item.id">
                <span><span>{{ item.title }}</span><span class="companyself">企业自述</span></span>
                <span>{{ item.sub_title }}</span>
                <span v-html="dealBr(item.content)"></span>
              </div>
              <div class="left_second2" v-else-if="item.type==='2'" :id="item.id">
                 <div>
                  <span><span>{{ item.title }}</span></span>
                  <span>
                    {{ item.sub_title }}
                  </span>
                  <span v-html="dealBr(item.content)"></span>
                 </div>
                 <div>
                  <span class="companyself">企业自述</span>
                  <img  :src="cahngeSize(item.img_url,284,188)" alt="">
                 </div>
              </div>
              <div class="left_second3" v-else-if="item.type==='3'" :id="item.id">
                <div><span>{{ item.title }}</span><span class="companyself">企业自述</span></div>
                <div class="left_second3_bottom">
                  <div class="left_second3_img" v-for="(item2,index) in item.photo_list" :key="index">
                    <div class="div_border"><img :src="cahngeSize(item2.img_url,256,170)" alt=""></div>
                    <span>{{ item2.desc }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left_thired" id="last" :key="index">
            <div class="left_thired1">登记信息</div>
            <div class="left_thired2">
              <span>登记信息已核验</span>
              <span>以下信息与全国企业信用信息公示系统同步时间</span>
              <span>{{dealTime(main_data.lastupdatetime)}}</span>
            </div>
            <div class="left_thired3">
              <div class="left_thired3Detail" v-for="(item,index) in company_base_info" :key="index">
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
            </div>
            </div>
            <div class="left_thired4">经营范围</div>
            <div class="left_thired5" v-html="dealBr(main_data.business_scope)"></div>
            <div  @click="goDetail" class="left_thired6">查看更多 <span><img src="~public/companyMobile/common/righticon.png" alt=""></span></div>
          </div>
        </div>
  </div>
</template>

<script setup>
import {dealBr,cahngeSize} from './util'

const props = defineProps(['info','digest'])
const {intro,custom_content_list,main_data,company_base_info} = props.info || {}

const new_custom_content_list = custom_content_list?.map(item=>{
  item.isShowUnflod = false
  return item
})

//处理日期
const dealTime = computed(()=>{
  return (str)=>{
    let arr = str.split('-')
    return `${arr[0]}年${arr[1]}月${arr[2]}日`
  }
})


const goDetail = ()=>{
  window.open(`https://shuidi.cn/company-${props.digest}.html`, '_blank');
}

</script>

<style lang="scss" scoped>

.companyself{
      color: #C7C7C7 !important;
      font-size: 15PX !important;
    }
   .content_left{
        width: 830PX;
        .left_first{
          border-radius: 10PX 0PX 0PX 10PX;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          margin-top: -51PX;
          display: flex;
          flex-direction: column;
          span:nth-child(1){
            padding: 12PX 0 0 8PX;
            color: #000000;
            font-weight: 500PX;
            font-size: 26PX;
            font-style: normal;
            text-decoration: none;
            display: flex;
            justify-content: space-between;
            span:nth-child(2){
              margin-top: 20PX;
            }
          }
          span:nth-child(2){
            color: #343434;
            font-weight: 400PX;
            font-size: 16PX;
            line-height: 26PX;
            font-style: normal;
            text-decoration: none;
            text-align: left;
            padding: 0 20PX 18PX 20PX;
            text-align: justify;
          }
        }
      }

      .left_second{
        .left_second1{
          display: inline-block;
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 10PX 19PX 8PX 14PX;
          margin-top: 15PX;
          display: flex;
          flex-direction: column;
          text-align: left;
          text-decoration: none;
          font-style: normal;
          color: #000000;
          font-weight: 500PX;
          span:nth-child(1){
            font-size: 26PX;
            display: flex;
            justify-content: space-between;
            span:nth-child(2){
              margin-top: 8PX;
            }
          }
          span:nth-child(2){
            font-size: 20PX;
            margin-top: 21PX;
            margin-bottom: 10PX;
          }
          span:nth-child(3){
            color: #343434;
            font-weight: 400PX;
            font-size: 16PX;
            line-height: 26PX;
            font-style: normal;
            text-decoration: none;
            margin-bottom: 16PX;
            text-align: justify;
          }
        }
        .left_second2{
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 10PX 19PX 8PX 14PX;
          margin-top: 15PX;
          display: flex;
          div:nth-child(1){
            display: flex;
            flex-direction: column;
            span:nth-child(1){
              font-size: 26PX;
            }
            span:nth-child(2){
              font-size: 20PX;
              margin-top: 21PX;
              margin-bottom: 10PX;
            }
            span:nth-child(3){
              color: #343434;
              font-weight: 400PX;
              font-size: 16PX;
              line-height: 26PX;
              font-style: normal;
              text-decoration: none;
              margin-bottom: 16PX;
              text-align: justify;
            }
          }
          div:nth-child(2){
            span{
              display: inline-block;
              width: 100%;
              text-align: right;
            }
           img{
            width: 284PX;
            height: 188PX;
            padding: 75PX 19PX 0 18PX;
           }
          }
        }
        .left_second3{
          background-color: #FFFFFF;
          box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
          padding: 10PX 19PX 8PX 14PX;
          margin-top: 15PX;
          div:nth-child(1){
            display: flex;
            justify-content: space-between;
            font-size: 26PX;
          }
          .left_second3_bottom{
            margin-top: 21PX;
            display: flex;
            flex-wrap: wrap;
          }
        }
        .left_second3_img{
          display: flex;
          flex-direction: column;
          width: 256PX;
          box-sizing: border-box;
          img{
            width: 254PX;
            height: 166PX;
          }
          span{
            color: #000000;
            font-weight: 500PX;
            font-size: 18PX;
            font-style: normal;
            text-decoration: none;
            text-align: left;
            text-align: center;
            margin: 15PX 0 27PX 0;
          }
          .div_border{
            width: 256PX;
            height: 170PX;
            box-sizing: border-box;
            padding: 1PX;
            background: #fff;
            border: 1PX solid #fff;
            box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.3);
          }
        }
        .left_second3_img:not(:nth-child(3n)) {
          margin-right: 12.5PX;
        }
      }

      .left_thired{
        background-color: #FFFFFF;
        box-shadow: 0PX 0PX 4PX 0PX rgba(0,0,0,0.2);
        padding: 10PX 19PX 8PX 14PX;
        margin-top: 15PX;
        color: #000000;
        font-weight: 500PX;
        font-size: 26PX;
        font-style: normal;
        text-decoration: none;
        text-align: left;
        .left_thired2{
          color: #7C530B;
          font-weight: 400PX;
          font-size: 16PX;
          text-align: left;
          margin-top: 15PX;
          span:nth-child(1){
            display: inline-block;
            border-radius: 4PX;
            background: linear-gradient(90deg, rgba(232,202,153,1) 0%,rgba(255,246,221,1) 100%);
            padding: 0 5PX;
          }
          span:nth-child(2){
            color: #7C530B;
            margin-left: 8PX;
          }
          span:nth-child(3){
            color: #343434;
            font-weight: 400PX;
            font-size: 16PX;
            margin-left: 8PX;
          }
        }
        .left_thired3{
          display: flex;
          flex-wrap: wrap;
          color: #343434;
          font-weight: 400PX;
          font-size: 16PX;
          font-style: normal;
          text-decoration: none;
          text-align: left;;
          .left_thired3Detail{
            width: 33%;
            display: flex;
            flex-direction: column;
            margin-top: 21PX;
          }
        }
        .left_thired4{
          color: #343434;
          font-weight: 400PX;
          font-size: 16PX;
          font-style: normal;
          text-decoration: none;
          text-align: left;
          margin-top: 22PX;
        }
        .left_thired5{
          color: #343434;
          font-weight: 400PX;
          font-size: 16PX;
          font-style: normal;
          text-decoration: none;
          text-align: left;
          margin-top: 11PX;
          text-align: justify;
        }
        .left_thired6{
          color: #343434;
          font-weight: 400PX;
          font-size: 16PX;
          font-style: normal;
          text-decoration: none;
          text-align: left;
          margin-top: 15PX;
          margin-bottom: 25PX;
          img{
            width: 7.78PX;
            height: 12.73PX
          }
        }
        .left_thired6:hover{
          cursor: pointer;
        }
      }
</style>