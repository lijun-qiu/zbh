<template>
  <div>
    <div class="header_color">
        <div class="header">
          <div class="header_dsc">
            <span class="company_icon">
              <img src="~public/companyMobile/common/titleimg.png" alt="">
            </span>
            <span v-if="browser==='悟空搜索'">欢迎访问<img src="~public/companyMobile/common/wukongicon.png" alt="">{{browser}}专区</span>
            <span v-if="browser==='UC浏览器'">欢迎访问<img src="~public/companyMobile/common/ucicon.png" alt="">{{browser}}专区</span>
            <span v-if="browser==='夸克'">欢迎访问<img src="~public/companyMobile/common/kuakeicon.png" alt="">{{browser}}专区</span>
            <span v-if="browser==='360浏览器'">欢迎访问<img src="~public/companyMobile/common/360icon.png" alt="">{{browser}}专区</span>
            <span v-if="browser==='头条'">欢迎访问<img src="~public/companyMobile/common/toutiaoicon.png" alt="">{{browser}}专区</span>
          </div>
        
          <div class="company">
            <div class="company_name"><span>{{  main_data?.company_name  }}</span><span>统一社会信用代码:{{ main_data?.credit_no }}</span></div>
            <div class="company_box">
              <div class="leftarrow" v-show="leftIcon" @click="scrollToStart"><img src="~public/companyMobile/common/arrow.png" alt=""></div>
              <div class="company_dsc" ref="company_dsc">
                <div class="company_dsc_box" ref="company_dsc_box">
                  <div v-for="(item,index) in companydecList" :key="index" :class="['companytab',item.index===activeIndex?'':'opcity']" @click="indexChange(item)">
                    <a :class="['companytaba',item.index===activeIndex?'titleactive':'']" :href="item.id">{{ item.title }}</a>
                    <span :class="[item.index===activeIndex?'active':'']"></span>
                  </div>
                </div>
              </div>
              <div class="rightarrow" v-show="rightIcon" @click="scrollToOriginalPosition"><img src="~public/companyMobile/common/arrow.png" alt=""></div>
            </div>
          </div>
          <div class="conpany_detail">
            <div class="left">
              <div class="left_1">
                <span>企业自述</span>
              </div>
              <div class="left_2">
                <span><img :src="base_info.logo" alt="企业头像"></span>
                <span v-html="dealBr(intro)"></span>
              </div>
            </div>
            <div class="right">
              <div class="right_top"><span>守信经营承诺单位</span>
                <span>公示期:{{service_start_date}}-{{ service_expire_date }}</span>
              </div>
              <div class="right_center">
                <div class="scroll_center">
                  <span v-for="(item,index) in company_credit_labels" :key="index">
                    {{ item }}
                  </span>
                </div>
              </div>
              <div class="right_bottom">
                中国中小企业协会 信用增值服务委员会 | 水滴信用立信计划 | 官方备案征信机构运营
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import {dealBr} from './util'

const props = defineProps(['info'])

const {base_info,main_data,company_credit_labels,intro,custom_content_list,service_start_date,service_expire_date} = props.info || {}

//处理导航条
const companydecList = ref([])
companydecList.value.push({id:'#first',title:'公司简介',index:1})
custom_content_list&&custom_content_list.forEach((item,index) => {
  companydecList.value.push({id:'#'+item.id,title:item.title,index:index+2})
})
companydecList.value.push({id:'#last',title:'登记信息',index:companydecList.value.length+1})

// 获取当前路由对象
const route = useRoute()

//判断来源
const {from, digest} = route.query
const source = from || ''
let browser = ref('')


const getSource = (source)=>{
  switch (true) {
    case source == 'toutiao':
      return '头条';
    case source == 'new360':
      return '360浏览器';
    case source == 'uc':
      return 'UC浏览器';
    default:
      return '';
  }
}
browser.value = getSource(source)


let activeIndex = ref(1)
const indexChange = (item)=>{
  activeIndex.value = item.index
}

let company_dsc = ref(null)
const leftIcon = ref(false)
const rightIcon = ref(false)
const scrollWidth = ref(0)

const scrollToStart = ()=> {
  rightIcon.value = true
 if(scrollWidth.value<520){
  company_dsc.value.scrollLeft = company_dsc.value.scrollLeft - scrollWidth.value
 }else{
  if(company_dsc.value.scrollLeft-520>0){
      company_dsc.value.scrollLeft = company_dsc.value.scrollLeft - 520
    }else{
      company_dsc.value.scrollLeft = company_dsc.value.scrollLeft - 520
      leftIcon.value = false
    }
 }
  
}
const scrollToOriginalPosition = ()=> {
  leftIcon.value = true
  if(scrollWidth.value<520){
    company_dsc.value.scrollLeft = company_dsc.value.scrollLeft + scrollWidth.value
    rightIcon.value = false
  }else{
    if(company_dsc.value.scrollLeft+520<scrollWidth.value){
      company_dsc.value.scrollLeft = company_dsc.value.scrollLeft + 520
    }else{
      company_dsc.value.scrollLeft = company_dsc.value.scrollLeft + 520
      rightIcon.value = false
    }
  }
  
}

onMounted(() => {
  //监测是否有滚动
  let startScroll = company_dsc.value.scrollWidth - company_dsc.value.offsetWidth

  if(startScroll>0){
    rightIcon.value = true
  }
  scrollWidth.value = company_dsc.value.scrollWidth - company_dsc.value.offsetWidth

})
</script>

<style lang="scss" scoped>
 .header_color{
      width: 100%;
      height: 477PX;
      background: #D12734;
      display: flex;
      justify-content: center;
    }
    .header{
      height: 477PX;
      width: 1400PX;
      background-color: #D12734;

      .header_dsc{
        padding-top: 25PX;
        padding-left: 50PX;
        padding-right: 45PX;
        display: flex;
        justify-content: space-between;
        color: #FFF9D7;
        font-weight: 700PX;
        font-size: 20PX;
        font-style: normal;
        text-decoration: none;
        text-align: left;
        img{
          width: 26PX;
          height: 26PX;
          position: relative;
          top: 7PX;
          margin: 0 2PX;
        }
      }
      .hrader_dsc span:nth-child(2){
        opacity: 0.8;
        color: #FFFFFF;
        font-weight: 400PX;
        font-size: 16PX;
        font-style: normal;
        text-decoration: none;
        text-align: left;
      }

      .company_icon{
       img{
        width: 400PX;
        height: 70PX;
       }
      }

      .company{
        display: flex;
        justify-content: space-between;
        padding: 40PX 97PX;
        .company_name{
          display: flex;
          flex-direction: column;
          color: #FFFFFF;
          margin-left: 20PX;
          span:nth-child(1){
            font-weight: 500PX;
            font-size: 30PX;
            width: 550PX;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          span:nth-child(2){
            font-weight: 400PX;
            font-size: 15PX;
            opacity: 0.8;
            margin-top: 6PX;
          }
        }
        .company_box{
          width: 580PX;
          height: 54PX;
          border-radius: 10PX;
          background-color: rgba(0, 0, 0, 0.2);
          display: flex;

          .leftarrow{
            width: 9.4PX;
            height: 15.38PX;
            transform: rotate(180deg);
            img{
              width: 9.4PX;
              height: 15.38PX;
              position: relative;
              right: 10PX;
              bottom: 20PX;
            }
          }
          .leftarrow:hover{
            cursor: pointer;
          }
          .leftarrow:active{
            opacity: 0.7;
          }
          .rightarrow{
            width: 9.4PX;
            height: 15.38PX;
            
            img{
              width: 9.4PX;
              height: 15.38PX;
              position: relative;
              right: 10PX;
              top: 15PX;
            }
          }
          .rightarrow:active{
            opacity: 0.7;
          }
          .rightarrow:hover{
            cursor: pointer;
          }
        }
        .company_dsc{
          width: 520PX;
          height: 54PX;
          overflow-x: hidden; 
          overflow-y: hidden; 
          background-color: rgba(0, 0, 0, 0.2);
          margin: 0 auto;
          .company_dsc_box{
            white-space: nowrap;
            display: flex;
            position: relative;
            .companytab{
              display: flex;
              flex-direction: column;
            }
            .opcity{
              opacity: 0.7;
            }
            div{
              color: #FFFFFF;
              font-size: 18PX;
              font-style: normal;
              text-decoration:none ;
              text-align:left ;
              line-height :50PX ;

            }
            div:first-child{
              margin-left: 10PX;
            }
            div:not(:first-child){
              margin-left: 43PX;
            }
            div:last-child{
              padding-right: 20px;
            }
            a{
              text-decoration: none;
              color: inherit;
            }
            .active{
                display: inline-block;
                width: 60PX;
                height: 4PX;
                background-color: #FFFFFF;
                color: #FFFFFF;
                font-weight: 400PX;
                margin: 0 auto;
                margin-top: -7PX;
            }
            .companytaba{
              text-align: center;
            }
            .titleactive{
               color: #FFFFFF;
            }
          }
        }
      }

      .conpany_detail{
        display: flex;
        justify-content: space-between;
        padding-left: 103PX;
        padding-right: 97PX;
        .left{
          flex: 1;
          display: flex;
          .left_1 {
            width: 24PX;
            height: 84PX;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 10PX 0PX 0PX 10PX;
            color: #FFFFFF;
            font-weight: 400PX;
            font-size: 13PX;
            line-height: 16PX;
            font-style: normal;
            text-decoration: none;
            text-align: center;
            padding-top: 10PX;
            span{
              opacity: 0.7;
            }
          }
          .left_2 {
            display: flex;
            width: 594PX;
            height: 140PX;
            box-sizing: border-box;
            border-radius: 0PX 10PX 10PX 10PX;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 17PX 0; 
            span:nth-child(1){
              display: inline-block;
              width: 106PX;
              height: 106PX;
              background: #fff;
              border-radius: 10PX;
              overflow: hidden;
              display: flex;
              align-items: center;
              img{
                width: 100%;
              }
              margin-left: 14PX;
              margin-right: 20PX;
            }
            span:nth-child(2){
              display: block;
              width: 430PX;
              height: 114PX;
              color: #FFFFFF;
              font-weight: 400PX;
              font-size: 16PX;
              line-height: 28PX;
              font-style: normal;
              text-decoration: none;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              white-space: pre-wrap;
              text-align: justify;
            }
          }
        }
        .right{
          flex: 1;
          width: 581PX;
          height: 140PX;
          border-radius: 10PX;
          background-color: rgba(0, 0, 0, 0.2);
          margin-left: 15PX;
          box-sizing: border-box;
          .right_top{
            span:nth-child(1){
              display: inline-block;
              width: 234PX;
              height: 40PX;
              border-radius: 10PX 0PX 10PX 0PX;
              background-color: rgba(0, 0, 0, 0.2);
              color: #FFF9D7;
              font-weight: 700PX;
              font-size: 22PX;
              letter-spacing: 3PX;
              font-style: normal;
              text-decoration: none;
              text-align: center;
              line-height: 40PX;
            }
            span:nth-child(2){
              width: 193PX;
              height: 18PX;
              opacity: 0.66;
              color: #FFFFFF;
              font-weight: 400PX;
              font-size: 13PX;
              font-style: normal;
              text-decoration: none;
              text-align: left;
              margin-left: 130PX;
            }
          }
          .right_center{
            width: 561PX;
            overflow: hidden;
            .scroll_center{
              display: flex;
              white-space: nowrap;
              span{
                display: inline-block;
                height: 26PX;
                border-radius: 4PX;
                background: linear-gradient(-90deg, rgba(232,202,153,1) 0%,rgba(255,246,221,1) 100%);
                line-height: 26PX;
                padding: 0 7PX;
                margin: 17PX 0 23PX 0;
              }
              span:nth-child(1){
                margin-left: 18PX;
              }
              span:not(:first-child){
                margin-left: 12PX;
              }
            }

          }
          .right_bottom{
            height: 18PX;
            color: #FFFFFF;
            font-weight: 400PX;
            font-size: 13PX;
            font-style: normal;
            text-decoration: none;
            opacity: 0.7;
            margin-left: 37PX;
          }
        }
      }
    }
</style>