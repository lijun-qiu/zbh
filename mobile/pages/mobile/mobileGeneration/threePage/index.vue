<template>
  <div class="page">
      <div v-if="info2">
        <companyHeader v-if="info2?.companyInfo" :companyInfo="info2.companyInfo" :companydecList="info.companydecList" :paibianList="info.paibianList" :companyLogo="info2.companyLogo"  :browser="browser"></companyHeader>
        <div class="content">
          <companyContent v-if="info" :advertisementList="info.advertisementList" :advertisementImgs="info.advertisementImgs" :companyInfoList="info.companyInfoList" :companyContact="info.companyContact" :companyLog="info2?.companyInfo?.logoStr?.logoImgStr"></companyContent>
          <companyDescription v-if="info" :companyNotice="info.companyNotice" :navigationList="info.navigationList"></companyDescription>
        </div>
        <companyFooter v-if="info"></companyFooter>

        <div class="gopay" @click="goPay">
          <img src="~public/mobileGeneration/gopay.png" alt="">
        </div>
      </div>
  </div>
</template>

<script setup>
import companyHeader from './companyHeader.vue'
import companyContent from './companyContent.vue'
import companyDescription from './companyDescription.vue'
import companyFooter from './companyFooter.vue'

import {blockRolling} from './util'

const props = defineProps(['browser','info2','payStates'])

const {browser,info2,payStates} = props || {}


//静态数据
let info =  reactive({
  companydecList: [{title:'公司概览',id:'#1',index:1},{title:'创新发展',id:'#2',index:2},{title:'服务至上',id:'#3',index:3},{title:'客户体验',id:'#4',index:4},{title:'合作共赢',id:'#5',index:5},{title:'价值理念',id:'#6',index:6},{title:'登记信息',id:'#7',index:7}],
  paibianList :[{title:'2023年立信企业'},{title:'已签署信用承诺书'},{title:'登记信息已核验'},{title:'正常在营'}],
  navigationList : [
  {id:'1',title:'公司简介',content:''},

  {id:'2',type:'1',title1:'创新发展',title2:'始终秉持创新精神',content:'在快速变革的时代，创新是企业持续发展的关键，我们公司始终秉持着创新的精神，不断探索新的技术和解决方案，以满足不断变化的市场需求。<br><br>公司致力于为客户提供前沿的产品和服务，通过不断创新，我们将持续为客户创造更大的价值。<br><br>我们拥有一支技术精湛、经验丰富的团队，熟悉最新的技术趋势和市场需求。<br><br>我们的专业知识和技术专长使我们能够为客户提供最佳的解决方案，帮助他们实现业务目标和创造更大的价值。<br>'},

  {id:'3',type:'2',title1:'服务质量',title2:'客户至上',content:'客户至上是我们公司的宗旨。我们坚持以客户需求为导向，提供高质量的服务。我们拥有一支经验丰富、专业素养高的团队，致力于为客户提供个性化的解决方案。<br><br>无论是产品交付、售后服务还是技术支持，我们都以高标准、高效率为目标，确保客户享受到优质的服务体验。您的满意是我们最大的动力！',img:'/mobileGeneration/picture2.png'},

  {id:'4',type:'2',title1:'客户体验',title2:'与客户共同成长',content:'我们深知客户体验对于企业的重要性。因此，我们不仅注重产品的质量和性能，更关注客户在使用过程中的感受。<br><br>我们时刻倾听客户的需求和反馈，不断优化产品设计和服务流程，以提升客户的满意度。<br><br>我们承诺始终保持开放、透明的沟通，与客户共同成长，共同创造更美好的未来。',img:'/mobileGeneration/picture3.png'},
  {id:'5',type:'2',title1:'合作共赢',title2:'与客户共同发展',content:'我们坚信合作是实现共赢的关键。我们与客户、合作伙伴建立了长期稳定的合作关系，通过互信和共同努力，实现互利共赢。<br><br>我们积极倾听客户和合作伙伴的需求和意见，与他们密切合作，共同开拓市场，共同创造更大的商业价值。我们愿意与更多优秀的合作伙伴携手合作，共同发展。<br>',img:'/mobileGeneration/picture4.png'},

  {id:'6',type:'3',title1:'价值理念',content:[
    {title:'创新发展',img:'/mobileGeneration/picture1.png'},
    {title:'客户至上',img:'/mobileGeneration/picture2.png'},
    {title:'共同成长',img:'/mobileGeneration/picture3.png'},
    {title:'合作共赢',img:'/mobileGeneration/picture4.png'},
    {title:'品质保证',img:'/mobileGeneration/picture5.png'},
  ]},
  {id:'7',
  SignInfon:[
      // {title:'统一社会信用代码	',detaile:'91361121MA386N2X89'},{title:'经营状态',detaile:'存续（在营、开业、在册）'}...
    ],
    businessScope:{
      title:'经营范围',
      content:''
    }
  }
  ],

  advertisementList :[{title:'期待与您携手合作',type:'1',img:'/mobileGeneration/t1.png'}],
  advertisementImgs : [
    {
      contenImg:'/mobileGeneration/advertisementimg1.png',
      button1:'/mobileGeneration/button1.png',
      button2:'/mobileGeneration/button2.png',
      isShow:false
    },
  ],
  companyInfoList :[{title:'认证电话:',detaile:'',icon:1},{title:'认证网址:',detaile:'',icon:2},{title:'认证邮箱:',detaile:'',icon:3},{title:'企业地址:',detaile:'',icon:4}],

 companyContact: [
  {
    titleImg:'/mobileGeneration/avatar.png',
    name:'联系企业',
    job:'联系人',
    weixingImg:'',
  }
],

 companyNotice :{
  title:'企业公告',
  content:'尊敬的各位客户与合作伙伴：<br><br>感谢您一直以来对我们公司的支持与信任！<br>我们将一如既往地努力，为您提供更好的产品和服务。如有任何疑问或建议，请随时与我们联系。<br><br>祝您生活愉快，工作顺利！'
}
})

//企业信息
if(info2.contactInfo){
  let titleMap = {
    '认证电话:':'phone',
    '认证网址:':'website',
    '认证邮箱:':'companyEmail',
    '企业地址:':'companyAddress'
  }
  info.companyInfoList.map((item,index)=>{
    let str = titleMap[item.title]
    let detail = info2.contactInfo[str]
    item.detaile = detail
    return item
  })
}

//登记信息
if(info2.baseInfo){
  info.navigationList[info.navigationList.length-1].SignInfon = info2.baseInfo
  info.navigationList[info.navigationList.length-1].businessScope.content = info2.companyInfo.businessScope
}
if(info2.companyInfo){
  info.navigationList[0].content = info2.companyInfo.companyIntroduce
}

const config = useRuntimeConfig()
const route = useRoute()
const {id} = route.query

const checkPay = ()=>{
  if(payStates==2){
    //跳转成功页
    location.href = `${config.public.shuidiApp}/guanjia.html#/xbhGeneration/sucess?id=${id}`
  }
}
const goPay = ()=>{
  if(payStates==1){
    //未付款
    if(info2.version=='1'){
      //跳转1版本支付页
      location.href = `${config.public.shuidiApp}/guanjia.html#/xbhGeneration/pay?id=${id}`
    }else if(info2.version=='2'){
      location.href = `${config.public.shuidiApp}/guanjia.html#/lxhGeneration/pay?id=${id}`
    }
  }else if(payStates==3){
    //已被认领
    showToast('该企业已开通正式版')
  }
}

onMounted(async()=>{
  //阻止页面缩放
  blockRolling()
  //检查是否已支付
  checkPay()
})

</script>

<style scoped lang="scss">
.page{
  width: 1080px;
  font-family: SourceHanSerif;
  font-weight: 800px;
  font-style: normal;
  text-decoration: none;
  text-align: left;
  background-color: #f4f4f4;

  .gopay{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 68px;
    width: 1000px;
    height: 160px;
    border-radius: 40px;
    opacity: 0.94;
    img{
      width: 1000px;
      height: 160px;
    }
  }
  .gopay:active{
    opacity: 0.7;
  }
}
</style>
<style>
html {
  touch-action: manipulation;
}
body {
  margin: 0;
  overflow-x: hidden;
  touch-action: manipulation;
  touch-action: pan-x pan-y;
}
</style>