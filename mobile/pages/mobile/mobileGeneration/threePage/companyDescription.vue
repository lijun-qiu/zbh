<template>
  <div>
    <div class="company_announcement" ref="company_announcement_detail" :style="{height:isShowCompany? textHeight : ''}">
          <div class="title"><span>{{ companyNotice.title }}</span><span class="companyself">企业自述</span></div>
          <div class="company_announcement_detail" v-html="companyNotice.content"> </div>
          <unfold v-if="isShowCompany"  @showAll="showOtherAll('1')" @closeAll="closeOtherAll('1')"></unfold>
    </div>
    <div class="content_left">
          <div class="left_first" :id="item.id" ref="left_first" :style="{height:isLeftfirst?firstHeight:''}" v-for="(item,index) in navigationList1" :key="index">
            <div class="title"><span>{{ item.title }}</span><span class="companyself">企业自述</span></div>
            <div class="detail" v-html="item.content"> </div>
            <unfold v-if="isLeftfirst"  @showAll="showOtherAll('2')" @closeAll="closeOtherAll('2')"></unfold>
          </div>
          <div class="left_second">
            <div v-for="(item,index) in navigationList2" :key="index">
              <div class="left_second1" v-if="item.type==='1'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                <div class="title"><span>{{ item.title1 }}</span><span class="companyself">企业自述</span></div>
                <div>{{ item.title2 }}</div>
                <div v-html="item.content"> </div>

                <unfold v-if="item.isShowUnflod" @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
              </div>
              <div class="left_second2" v-else-if="item.type==='2'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                  <div class="title"><span>{{ item.title1 }}</span><span class="companyself">企业自述</span></div>
                  <div>
                    {{ item.title2 }}
                  </div>
                  <img :src="`${cdnURL+item.img}`" alt="">
                  <div class="left_second2_content" v-html="item.content">
                  </div>
                  <unfold v-if="item.isShowUnflod"  @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
                 <div>
                 </div>
              </div>
              <div class="left_second3" v-else-if="item.type==='3'" :id="item.id" :ref="setRef(item.ref)" :style="{height:item.isShowUnflod?item.defaultHeight:''}">
                <div class="title"><span>{{ item.title1 }}</span><span class="companyself">企业自述</span></div>
                <div class="left_second3_bottom">
                  <div class="left_second3_img" v-for="(item2,index) in item.content" :key="index">
                    <img :src="`${cdnURL+item2.img}`" alt="">
                    <span>{{ item2.title }}</span>
                  </div>
                </div>
                <unfold v-if="item.isShowUnflod"  @showAll="showAll(item)" @closeAll="closeAll(item)"></unfold>
              </div>
            </div>
          </div>
          <div class="left_thired" :id="item.id" ref="left_thired" :style="{height:isLeftThired?thiredHeight:''}" v-for="(item,index) in navigationList3" :key="index">
            <div class="left_thired1">登记信息</div>
            <div class="left_thired2">登记信息已核验</div>
            <div class="left_thired3">
              <span>以下信息与全国企业信用信息公示系统同步时间</span>
              <span>2023年7月26日</span>
            </div>
            <div class="left_thired4">
              <div class="left_thired3Detail" v-for="(item,index) in item.SignInfon" :key="index">
              <span>{{ item.title }}</span>
              <span>{{ item.detaile }}</span>
            </div>
            </div>
            <div class="left_thired5">{{ item.businessScope.title }}</div>
            <div class="left_thired6" v-html="item.businessScope.content"> </div>
            <div @click="goDetail" class="left_thired7" v-if="iumpShow">查看更多 <span><img src="~public/companyMobile/common/righticon.png" alt=""></span></div>
            <unfold v-if="isLeftThired"  @showAll="showOtherAll('3')" @closeAll="closeOtherAll('3')"></unfold>
          </div>
    </div>
  </div>
</template>

<script setup>
import unfold from './unflod.vue'


const props = defineProps(['navigationList','companyNotice'])

const config = useRuntimeConfig()

let cdnURL = config.public.cdnURL

cdnURL += '/shuidi/images/companyMobile2'


//移动端去掉跳转
let iumpShow = ref(false)

const {navigationList,companyNotice} = props||{}

//响应式
const newNavigationList = reactive(navigationList)

//  // 创建计算属性
 const navigationList1 = computed(() => {
    return newNavigationList.filter((item,index)=> index == 0)
  })

  let navigationList2 = computed(() => {
    return newNavigationList.filter((item,index)=>{
        return (index != 0) && (index != navigationList.length-1)
      })
  })

// 设置初始值
let refList = ref([])
const setRef = (refName) => (el) => {
  refList.value[refName] = el;
}

navigationList2?.value.map((item,index)=>{
    if(item.type=='1'){
      item.defaultHeight = '200px'
    }
    if(item.type=='2'){
      item.defaultHeight = '400px'
    }
    if(item.type=='3'){
      item.defaultHeight = '900px'
    }
    item.ref = 'introduce_'+index
    item.isShowUnflod = false
    return item
  })


  const navigationList3 = computed(() => {
    return newNavigationList.filter((item,index)=>(index == navigationList.length-1))
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
  isShowCompany.value = isElementOverflowed(company_announcement_detail.value,200)
  isLeftfirst.value = isElementOverflowed(left_first.value[0],200)
  isLeftThired.value = isElementOverflowed(left_thired.value[0],500)



  //判断是否需要展开符
  navigationList2?.value.forEach((item) => {
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
          .detail{
            padding-bottom: 30px;
          }
        }

        .left_second{
          .left_second1{
            padding: 0 40px;
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
            background: #fff;
            margin-top: 28px;
            position: relative;
            color: #343434;
            font-size: 44px;
            margin-top: 24px;
            overflow: hidden;
            text-align: justify;
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

            .left_second3_bottom{
              .left_second3_img{
                margin-top: 52px;
                text-align: center;
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