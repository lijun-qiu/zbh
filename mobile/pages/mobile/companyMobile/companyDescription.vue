<template>
  <div>
    <div v-if="company_announce" class="company_announcement" ref="company_announcement_detail" :style="{height:isShowCompany? textHeight : ''}">
          <div class="title"><span>企业公告</span><span class="companyself">企业自述</span></div>
          <div class="company_announcement_detail" v-html="dealBr(company_announce)"> </div>
          <unfold v-if="isShowCompany"  @showAll="showOtherAll('1')" @closeAll="closeOtherAll('1')"></unfold>
    </div>
    <div class="content_left">
          <div class="left_first" id="first" ref="left_first" :style="{height:isLeftfirst?firstHeight:''}">
            <div class="title"><span>公司简介</span><span class="companyself">企业自述</span></div>
            <div v-html="dealBr(intro)"> </div>
            <unfold v-if="isLeftfirst"  @showAll="showOtherAll('2')" @closeAll="closeOtherAll('2')"></unfold>
          </div>
          <div class="left_second">
            <div v-for="(item,index) in new_custom_content_list" :key="index">
              <div class="left_second1" v-if="item.type==='1'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                <div class="title"><span>{{ item.title }}</span><span class="companyself">企业自述</span></div>
                <div>{{ item.sub_title }}</div>
                <div v-html="dealBr(item.content)"> </div>

                <unfold v-if="item.isShowUnflod"  @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
              </div>
              <div class="left_second2" v-else-if="item.type==='2'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                  <div class="title"><span>{{ item.title }}</span><span class="companyself">企业自述</span></div>
                  <div>
                    {{ item.sub_title }}
                  </div>
                  <img :src="cahngeSize(item.img_url,500,330)" alt="">
                  <div class="left_second2_content" v-html="dealBr(item.content)">
                  </div>
                  <unfold v-if="item.isShowUnflod"  @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
                 <div>
                 </div>
              </div>
              <div class="left_second3" v-else-if="item.type==='3'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                <div class="title"><span>{{ item.title }}</span><span class="companyself">企业自述</span></div>
                <div class="left_second3_bottom">
                  <div class="left_second3_img" v-for="(item2,index) in item.photo_list" :key="index">
                    <div class="div_border"><img :src="cahngeSize(item2.img_url,500,330)" alt=""></div>
                    <span>{{ item2.desc }}</span>
                  </div>
                </div>
                <unfold v-if="item.isShowUnflod"  @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
              </div>
            </div>
          </div>
          <div class="left_thired" id="last" ref="left_thired" :style="{height:isLeftThired?thiredHeight:''}">
            <div class="left_thired1">登记信息</div>
            <div class="left_thired2">登记信息已核验</div>
            <div class="left_thired3">
              <span>以下信息与全国企业信用信息公示系统同步时间</span>
              <span>{{dealTime(main_data.lastupdatetime)}}</span>
            </div>
            <div class="left_thired4">
              <div class="left_thired3Detail" v-for="(item,index) in company_base_info" :key="index">
              <span>{{ item.name }}</span>
              <span>{{ item.value }}</span>
            </div>
            </div>
            <div class="left_thired5">经营范围</div>
            <div class="left_thired6" v-html="(main_data.business_scope)"> </div>
            <div @click="goDetail" class="left_thired7" v-if="iumpShow">查看更多 <span><img src="~public/companyMobile/common/righticon.png" alt=""></span></div>
            <unfold v-if="isLeftThired"  @showAll="showOtherAll('3')" @closeAll="closeOtherAll('3')"></unfold>
          </div>
    </div>
  </div>
</template>

<script setup>
import unfold from './unflod.vue'
import {dealBr,cahngeSize} from './util'

const props = defineProps(['info'])
const {intro,company_announce,custom_content_list,main_data,company_base_info} = props.info || {}


//处理日期
const dealTime = computed(()=>{
  return (str)=>{
    let arr = str.split('-')
    return `${arr[0]}年${arr[1]}月${arr[2]}日`
  }
})

//移动端去掉跳转
let iumpShow = ref(false)

const new_custom_content_list = custom_content_list?.map((item,index)=>{
  item.isShowUnflod = false
  item.ref = 'introduce_'+index
  return item
})
  
// 设置初始值
let refList = ref([])
const setRef = (refName) => (el) => {
  refList.value[refName] = el;
}

  // 设置初始高度
  new_custom_content_list?.map((item)=>{
    if(item.type=='1'){
      item.defaultHeight = '200px'
    }
    if(item.type=='2'){
      item.defaultHeight = '400px'
    }
    if(item.type=='3'){
      item.defaultHeight = '900px'
    }
    return item
  })


//查看更多
const goDetail = ()=>{
  location.href = 'https://shuidi.cn/index.html#/company?digest=9b439914b25e9ca7a31d28558ba7ed75'
}


//判断是否需要展开符
const isElementOverflowed = (element,target)=> {
  return element.clientHeight>target
}

//企业公告
let textHeight = ref('200px')
let company_announcement_detail = ref(null)
let isShowCompany = ref(false)
//公司简介
let firstHeight = ref('200px')
let left_first = ref(null)

let isLeftfirst = ref(false)
//工商信息
let thiredHeight = ref('500px')
let left_thired = ref(null)

let isLeftThired = ref(false)

const showOtherAll = (type)=>{
  if(type==='1'){
    textHeight.value = 'auto'
  }
  if(type==='2'){
    firstHeight.value = 'auto'
  }
  if(type==='3'){
    thiredHeight.value = 'auto'
  }
 
}
const closeOtherAll = (type)=>{
  if(type==='1'){
    textHeight.value = '200px'
  }
  if(type==='2'){
    firstHeight.value = '200px'
  }
  if(type==='3'){
    thiredHeight.value = '500px'
  }
}


//动态收起和隐藏
const showAll = (item)=>{
  item.defaultHeight = 'auto'
}
const closeAll = (item)=>{
  if(item.type==='1'){
    item.defaultHeight = '200px'
  }
  if(item.type==='2'){
    item.defaultHeight = '400px'
  }
  if(item.type==='3'){
    item.defaultHeight = '900px'
  }
}

onMounted(()=>{

  //显示展开符
  company_announcement_detail.value?isShowCompany.value = isElementOverflowed(company_announcement_detail.value,200):null
  left_first.value?isLeftfirst.value = isElementOverflowed(left_first.value,200):null
  left_thired.value?isLeftThired.value = isElementOverflowed(left_thired.value,500):null

  
  //判断是否需要展开符
  new_custom_content_list?.forEach((item) => {
    const divElement = refList.value[item.ref]
    if(divElement){
      if(item.type==='1'){
        item.isShowUnflod = isElementOverflowed(divElement,200)
      }
      if(item.type==='2'){
        item.isShowUnflod = isElementOverflowed(divElement,400)
      }
      if(item.type==='3'){
        item.isShowUnflod = isElementOverflowed(divElement,900)
      }
    }
  });
})
</script>

<style lang="scss" scoped>
 .companyself{
    color: #C7C7C7;
    font-size: 30px;
  }
  .company_announcement{
        padding: 0 40px;
        background: #fff;
        margin-top: 28px;
        position: relative;
        overflow: hidden;
        .title{
          padding-top: 26px;
          padding-bottom: 26px;
          color: #000000;
          font-weight: 1000px;
          font-size: 52px;
          display: flex;
          justify-content: space-between;

        }

        .company_announcement_detail{
          color: #343434;
          font-size: 44px;
          text-align: justify;
          padding-bottom: 40px;
        }
      }

      .content_left{
        .left_first{
          padding: 0 40px;
          padding-bottom: 40px;
          background: #fff;
          margin-top: 28px;
          position: relative;
          color: #343434;
          font-size: 44px;
          margin-top: 24px;
          overflow: hidden;
          text-align: justify;
          .title{
            margin-top: 26px;
            padding-top: 26px;
            margin-bottom: 22px;
            color: #000000;
            font-weight: 1000px;
            font-size: 52px;
            display: flex;
            justify-content: space-between;
          }
        }

        .left_second{
          .left_second1{
            padding: 0 40px;
            padding-bottom: 40px;
            background: #fff;
            margin-top: 28px;
            position: relative;
            color: #343434;
            font-size: 44px;
            margin-top: 24px;
            overflow: hidden;
            text-align: justify;
            div{
              color: #343434;
              font-weight: 800px;
              font-size: 44px;
            }
            div:nth-child(2){
              color: #000000;
              font-weight: 1000px;
              font-size: 40px;
              margin-bottom: 28px;
            }
            div:nth-child(3){
              padding-bottom: 40px;
            }
            .title{
              margin-top: 26px;
              padding-top: 26px;
              margin-bottom: 22px;
              color: #000000;
              font-weight: 1000px;
              font-size: 52px;
              display: flex;
              justify-content: space-between;
            }
          }

          .left_second2{
            padding: 0 40px;
            padding-bottom: 40px;
            background: #fff;
            margin-top: 28px;
            position: relative;
            color: #343434;
            font-size: 44px;
            margin-top: 24px;
            overflow: hidden;
            text-align: justify;
            div{
              color: #343434;
              font-weight: 800px;
              font-size: 44px;
            }
            div:nth-child(2){
              color: #000000;
              font-weight: 1000px;
              font-size: 40px;
              margin-bottom: 40px;
            }
            .left_second2_content{
              padding-bottom: 28px;
            }
            img{
              width: 1000px;
              height: 660px;
            }
          .title{
              margin-top: 26px;
              padding-top: 26px;
              margin-bottom: 22px;
              color: #000000;
              font-weight: 1000px;
              font-size: 52px;
              display: flex;
              justify-content: space-between;
            }
          }

          .left_second3{
            padding: 0 40px;
            padding-bottom: 40px;
            background: #fff;
            margin-top: 28px;
            position: relative;
            color: #343434;
            font-size: 44px;
            margin-top: 24px;
            overflow: hidden;
            text-align: justify;
  
            .title{
              margin-top: 26px;
              padding-top: 26px;
              margin-bottom: 22px;
              color: #000000;
              font-weight: 1000px;
              font-size: 52px;
              display: flex;
              justify-content: space-between;
            }

            .left_second3_bottom{
              padding-bottom: 40px;
              .left_second3_img{
                margin-top: 52px;
                text-align: center;
                .div_border{
                  width: 1000px;
                  height: 660px;
                  padding: 1px;
                  border: 1px solid #fff;
                  box-sizing: border-box;
                  background: #fff;
                  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
                  img{
                    width: 990px;
                    height: 650px;
                  }
                }
              }
            }
          }
        }

        .left_thired{
          padding: 0 40px;
          background: #fff;
          margin-top: 28px;
          position: relative;
          color: #343434;
          font-size: 44px;
          margin-top: 24px;
          overflow: hidden;
          .left_thired1{
            color: #000000;
            font-weight: 1000px;
            font-size: 52px;
            margin-top: 26px;
          }
          .left_thired2{
            width: 256px;
            height: 52px;
            margin-top: 34px;
            margin-bottom: 28px;
            color: #7C530B;
            font-size: 32px;
            border-radius: 8px;
            background: linear-gradient(90deg, rgba(232,202,153,1) 0%,rgba(255,246,221,1) 100%);
          }
          .left_thired3{
            color: #7C530B;
            font-size: 30px;
            display: flex;
            justify-content: space-between;
            span:nth-child(2){
              color: #343434;
            } 
          }
          .left_thired4{
            .left_thired3Detail{
              display: flex;
              flex-direction: column;
              font-size: 44px;
              margin-top: 22px;
              span:nth-child(1){
                color: #878787;
              }
              span:nth-child(2){
                color: #343434;
                margin-top: 12px;
              }
            }
            
          }
          .left_thired5{
            margin-top: 20px;
            color: #878787;
            font-size: 44px;
          }
          .left_thired6{
            color: #343434;
            font-size: 44px;
            margin-top: 6px;
          }
          .left_thired7{
            text-align: center;
            color: #343434;
            font-size: 44px;
            margin: 10px 0;
            img{
              width: 19px;
              height: 32px;
            }
          }
        }
      }
</style>