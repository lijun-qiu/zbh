<template>
<div>
  <div class="header">
      <div class="header_dsc">
          <span v-if="browser==='悟空搜索'">欢迎访问<img src="~public/companyMobile/common/wukongicon.png" alt="">{{browser}}专区</span>
          <span v-if="browser==='UC浏览器'">欢迎访问<img src="~public/companyMobile/common/ucicon.png" alt="">{{browser}}专区</span>
          <span v-if="browser==='夸克'">欢迎访问<img src="~public/companyMobile/common/kuakeicon.png" alt="">{{browser}}专区</span>
          <span v-if="browser==='360浏览器'">欢迎访问<img src="~public/companyMobile/common/360icon.png" alt="">{{browser}}专区</span>
          <span v-if="browser==='头条'">欢迎访问<img src="~public/companyMobile/common/toutiaoicon.png" alt="">{{browser}}专区</span>
      </div>
      <div class="company_icon">
          <img src="~public/companyMobile/common/titleimg.png" alt="">
      </div>
      </div>
      <div class="company">
        <div class="company_name"><span>{{ main_data?.company_name }}</span><span>统一社会信用代码:{{ main_data?.credit_no }}</span></div>
        <div class="companyhead">
          <div>
            <img :src="base_info.logo" alt="企业头像">
          </div>
          <div v-html="dealBr(intro)"> </div>
        </div>
      <div class="scroll-container">
        <div class="scroll-content">
          <div v-for="(item,index) in companydecList" :key="index" :class="['companytab',item.index===activeIndex?'':'opcity']"  @click="indexChange(item)">
              <span><a :class="['companytaba',item.index===activeIndex?'titleactive':'']" :href="item.id">{{ item.title }}</a></span>
              <span :class="[item.index===activeIndex?'active':'']"></span>
          </div>
        </div>
      </div>
      <div class="unitinfo">
          <div class="unitinfo_top"><span>守信经营承诺单位</span>
            <span>公示期:{{service_start_date}}-{{ service_expire_date }}</span>
          </div>
          <div class="unitinfo_box">
            <div class="unitinfo_center">
              <span v-for="(item,index) in company_credit_labels" :key="index">
                {{ item }}
              </span>
            </div>
          </div>
          <div class="unitinfo_bottom">
             中国中小企业协会 信用增值服务委员会 | 水滴信用立信计划 
          </div>
      </div>
    </div>
</div>
</template>

<script setup>
import {dealBr} from './util'

const props = defineProps(['info'])

const {base_info,main_data,company_credit_labels,intro,custom_content_list,service_start_date,service_expire_date} = props.info || {}
const companydecList = ref([])
companydecList.value.push({id:'#first',title:'公司简介',index:1})
custom_content_list&&custom_content_list.forEach((item,index) => {
  companydecList.value.push({id:'#'+item.id,title:item.title,index:index+2})
})
companydecList.value.push({id:'#last',title:'登记信息',index:companydecList.value.length+1})

// 导航条点击
let activeIndex = ref(1)
const indexChange = (item)=>{
  activeIndex.value = item.index
}

// 获取当前路由对象
const route = useRoute()

//判断来源
const {flow_source, digest} = route.query
const source = flow_source || ''
let browser = ref('')

const getSource = (source)=>{
  switch (true) {
    case source == 'toutiao':
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

</script>

<style lang="scss" scoped>
.header{
      background-color: #FFFFFF;
      padding: 0 40px;
      .header_dsc{
        color: #343434;
        font-weight: 800px;
        font-size: 32px;
        font-style: normal;
        text-decoration: none;
        text-align: left;
        margin: 20px 0;
        img{
          width: 52px;
          height: 52px;
          border-radius:8px;
          position: relative;
          top: 15px;
          margin: 0 4px;
        }
      }
      .company_icon{
        width: 1000px;
        height: 50px;
        padding-top: 20px;
        padding-bottom: 32px;
        img{
          width: 1000px;
          height: 50px;
        }
      }
}
.company{
      width: 1080px;
      height: 680px;
      background-color: #D12734;
      padding: 0 40px;
      box-sizing: border-box;

      .company_name{
        padding-top: 32px;
        color: #FFFFFF;
        font-size: 64px;
        span:nth-child(1){
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:nth-child(2){
          color: #FFFFFF;
          font-size: 36px;
          margin-top: 10px;
        }
      }

      .companyhead{
        display: flex;
        margin-top: 22px;
        img{
            width: 100%;
            max-height: 160px;;
            margin: auto;
            display: block;
        }
        div:nth-child(1){
          width: 160px;
          height: 160px;
          vertical-align: middle;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
        }
        div:nth-child(2){
          display: block;
          width: 800px;
          color: #FFFFFF;
          font-size: 36px;
          line-height: 58px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          white-space: pre-wrap;
          margin-left: 38px;
        }
      }
}
.scroll-container {
      position: relative;
      overflow: hidden;
      width: 1000px;
      height: 112px;
      border-radius: 10px;
      background-color: rgb(0,0,0,0.2);
      margin-top: 44px;
      .scroll-content {
        scrollbar-width: none; 
        -ms-overflow-style: none;
        overflow-x: auto;
        display: flex;
        white-space: nowrap;
        line-height: 112px;
        .companytab{
          color: #FFFFFF;
          font-size: 44px;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .opcity{
          opacity: 0.7;
        }
        .companytab:nth-child(1){
            margin-left: 34px;
        }
        .companytab:not(:first-child){
            margin-left: 56px;
        }
        .companytab:last-child{
          padding-right: 34px;
        }
        a{
          text-decoration: none;
          color: inherit;
        }

        .active{
          display: inline-block;
          width: 120px;
          height: 8px;
          background-color: #FFFFFF;
          color: #FFFFFF;
          margin: 0 auto;
          margin-top: -7PX;
        }
        .titleactive{
          color: #FFFFFF;
        }
      }
      .scroll-content::-webkit-scrollbar {
        display: none; 
      }
    }

    .unitinfo{
        width: 1000px;
        height: 290px;
        border-radius: 20px;
        background-color: #ffffff;
        box-shadow: 0px 0px 8px 8px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        margin-top: 44px;
        position: relative;
        .unitinfo_top{
          margin: 22px 20px 0 34px;
          display: flex;
          justify-content: space-between;
          span:nth-child(1){
            color: #7C530B;
            font-weight: 1400px;
            font-size: 54px;
            text-align: left;
          }
          span:nth-child(2){
            color: #C2A24E;
            font-size: 32px;
            position: relative;
            top: 24px;
          }
        }

        .unitinfo_box{
          .unitinfo_center{
            display: flex;
            white-space: nowrap;
            margin: 30px 0;
            margin-left: 34px;
            overflow-x: auto;
            scrollbar-width: none; 
            -ms-overflow-style: none;
            span{
              display: inline-block;
              height: 52px;
              background: red;
              border-radius: 8px;
              background: linear-gradient(90deg, rgba(232,202,153,1) 0%,rgba(255,246,221,1) 100%);
              color: #7C530B;
              font-size: 32px;
              padding: 0 14px;
              line-height: 52px;
            }
            span:not(:first-child){
              margin-left: 20px;
            }
            span:last-child{
              margin-right: 40px;
            }
          }
          .unitinfo_center::-webkit-scrollbar {
            display: none; 
          }
        }
        .unitinfo_bottom{
          margin-top: 4px;
          color: #525252;
          font-size: 28px;
          text-align: center;
        }
      }
</style>
