<template>
  <div class="imgcontent">
    <img v-if="browser==='360浏览器'" src="~public/mobileGeneration/360pic02.png" alt="">
    <img v-if="browser==='头条'" src="~public/mobileGeneration/toutiaopic02.png" alt="">
    <img v-if="browser==='夸克'" src="~public/mobileGeneration/quarkpic02.png" alt="">
    <img v-if="browser==='UC浏览器'" src="~public/mobileGeneration/ucpic02.png" alt="">
    <img v-if="browser==='悟空搜索'" src="~public/mobileGeneration/wukongpic02.png" alt="">
    <div v-if="browser==='头条'" class="toutiao">
      <div class="textnomole1 text1">{{ companyName }}</div>
      <div class="textnomole2 text2"> <span>{{ companyName }}</span><span>-企业信息</span></div>
    </div>
    <div v-if="browser==='360浏览器'" class="browser360">
      <div class="textnomole1 text1">{{ companyName }}</div>
      <div class="textnomole2 text2"> <span>{{ companyName }}</span><span>-企业信息</span></div>
    </div>
    <div v-if="browser==='夸克'" class="kuake">
      <div class="textnomole1 text1">{{ companyName }}</div>
      <div class="textnomole2 text2"> <span>{{ companyName }}</span><span>-企业信息</span></div>
    </div>
    <div v-if="browser==='UC浏览器'" class="browseruc">
      <div class="textnomole1 text1">{{ companyName }}</div>
      <div class="textnomole2 text2"> <span>{{ companyName }}</span><span>-企业信息</span></div>
    </div>
    <div v-if="browser==='悟空搜索'" class="browserwk">
      <div class="textnomole1 text1">{{ companyName }}</div>
      <div class="textnomole2 text2"> <span>{{ companyName }}</span><span>-企业信息</span></div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    browser: {
      type: String,
      required: true,
    },
    companyInfo: {
      type: Object,
      required: true,
    },
  },
  components:{},
  setup(props) {
    const {companyName} = props.companyInfo || {}

    return{
      companyName
    }
  }
}
</script>

<style scoped lang="scss">
.imgcontent{
  position: relative;
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }

  .textnomole2{
      span:nth-child(1){
        display: inline-block;
        max-width:760px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        position: relative;
        top: 10px;
        margin-right: 5px;
      }
    }

  .toutiao{
    .textnomole1{
      font-size: 42px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      width: 620px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .text1{
      position: absolute;
      top: 73px;
      left: 210px;
    }
    .text2{
      position: absolute;
      top: 320px;
      left: 65px;
      font-size: 48px;
      color: #ec4243;
      span:nth-child(2){
        color: #333333;
      }
    }
  }
 .browser360{
  .textnomole1{
      font-size: 42px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      width: 780px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  .text1{
      position: absolute;
      top: 110px;
      left: 160px;
    }
    .text2{
      position: absolute;
      top: 350px;
      left: 65px;
      font-size: 48px;
      color: #ec4243;
      span:nth-child(2){
        color: #333333;
      }
    }
 }
 .kuake{
  .textnomole1{
      font-size: 42px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      width: 800px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  .text1{
      position: absolute;
      top: 56px;
      left: 56px;
    }
    .text2{
      position: absolute;
      top: 320px;
      left: 65px;
      font-size: 48px;
      color: #ec4243;
      span:nth-child(2){
        color: #333333;
      }
    }
 }
 .browseruc{
  .textnomole1{
      font-size: 42px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      width: 780px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  .text1{
      position: absolute;
      top: 65px;
      left: 65px;
    }
    .text2{
      position: absolute;
      top: 210px;
      left: 65px;
      font-size: 48px;
      color: #ec4243;
      span:nth-child(2){
        color: #333333;
      }
    }
 }
 
 .browserwk{
  .textnomole1{
      font-size: 42px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #333333;
      width: 880px;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
  .text1{
      position: absolute;
      top: 90px;
      left: 135px;
    }
    .text2{
      position: absolute;
      top: 350px;
      left: 65px;
      font-size: 48px;
      color: #ec4243;
      span:nth-child(2){
        color: #333333;
      }
    }
 }
}
</style>