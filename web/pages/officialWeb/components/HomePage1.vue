

<!--
  Version: 官网第二页content+footer
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='home-page2'>
    <main v-if="store.source === '4'">
      <div class='title-box-main'>
        <div class='line1'>信博汇-新一代企业“广告”</div>
        <div class='line2'>中小企业都买得起的“广告”</div>
      </div>
      <div class='main-content'>
        <div class='pageB-tab-box'>
          <template v-for="(item,index) of ['覆盖范围', '表现丰富', '经济实惠']"
                    :key='index'>
            <div class='tab-box'
                 :class="{'active' : tabsIcon === index+1 + ''}"
                 @click='startAnimationTab(index); startAnimationLogo(0, 2000)'>
              <div class='left'>
                <template v-if="index === 0">
                  <img v-if="tabsIcon === '1'" src='public/officialWeb/home/pageB/tab1-active-icon.png' alt=''>
                  <img v-else src='public/officialWeb/home/pageB/tab1-no-active-icon.png' alt=''>
                </template>
                <template v-if="index === 1">
                  <img v-if="tabsIcon === '2'" src='public/officialWeb/home/pageB/tab2-active-icon.png' alt=''>
                  <img v-else src='public/officialWeb/home/pageB/tab2-no-active-icon.png' alt=''>
                </template>
                <template v-if="index === 2">
                  <img v-if="tabsIcon === '3'" src='public/officialWeb/home/pageB/tab3-active-icon.png' alt=''>
                  <img v-else src='public/officialWeb/home/pageB/tab3-no-active-icon.png' alt=''>
                </template>
                {{ item }}
              </div>
              <div class='right' v-show="tabsIcon === index+1 + ''">
                <img class='icon' src='public/officialWeb/home/pageB/tab-arrow-icon.png' alt=''>
              </div>
            </div>
          </template>
          <div class='tab-button' @click='openFormPop(5330)'>
            <span>立即上线我的广告</span>
            <img class='icon' src='public/officialWeb/home/pageB/button-head-red.png' alt=''>
          </div>
        </div>

        <div class='logo-content' v-show="tabsIcon === '1'">
          <div class='text-title-box'>
            <div class='line1'>超7亿用户覆盖</div>
            <div class='line2'>已在以下平台首页置顶展示，超40万中小企业已加入我们</div>
          </div>
          <BrowserLogoBox :currentIcon='currentIcon'
                          @clickLogo="(index)=>clickLogo(index)"/>
        </div>
        <div class='logo-content' v-show="tabsIcon === '2'">
          <div class='text-title-box'>
            <div class='line1'>“服务广告+官方形象”组合展示提升合作意向</div>
          </div>
          <div class='tab2-right-box'>
            <img class='icon' src='public/officialWeb/home/pageB/tab-card1.png' alt=''>
            <img class='icon' src='public/officialWeb/home/pageB/tab-card2.png' alt=''>
          </div>
        </div>
        <div class='logo-content' v-show="tabsIcon === '3'">
          <div class='text-title-box'>
            <div class='line1'>经济实惠，24小时在线保障</div>
          </div>
          <div class='tab3-right-box'>
            <img class='icon' src='public/officialWeb/home/pageB/tab3-card1.png' alt=''>
            <img class='icon' src='public/officialWeb/home/pageB/tab3-card2.png' alt=''>
            <img class='icon' src='public/officialWeb/home/pageB/tab3-card3.png' alt=''>
          </div>
        </div>
      </div>
    </main>

    <main v-else>
      <div class='title-box-main'>
        <div class='line1'>客户搜不到你？不信任你？</div>
        <div class='line2'>1小时解决，展现企业良好形象，获得更多合作机会</div>
      </div>
      <div class='main-content'>
        <MobileContent :currentIcon='currentIcon'/>
        <div class='logo-content'>
          <div class='text-title-box'>
            <div class='line1'>超7亿用户覆盖</div>
            <div class='line2'>已在以下平台首页置顶展示，超40万中小企业已加入我们</div>
          </div>
          <BrowserLogoBox :currentIcon='currentIcon'
                          @clickLogo="(index)=>clickLogo(index)"/>
          <div class='button-page1' @click='openFormPop(5330)'>
            抢先加入，1小时上线
            <img class='icon' src='public/officialWeb/home/right-arrow.png' alt=''>
          </div>
        </div>
      </div>
    </main>

    <footer style='height: 0'></footer>
    <footer id='footer-id'>
      <div class='footer-white'>
        <div class='tips-box'>
          *超七亿用户引用于BusinessAnalysis：《今日头条深度分析报告》（全文）<br>
          *以上APP下载量信息为2023年7月21日小米手机应用市场真实下载量数据
        </div>
        <div class='red'>24小时在线保障，首页置顶展示</div>
        <img class="logo"
             src="public/officialWeb/home/mouse-icon.png" alt="">
        <div class='yellow'>滚动鼠标查看</div>
      </div>
    </footer>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useStore } from "~/store/index";
import BrowserLogoBox from './pageOne/BrowserLogoBox'
import MobileContent from './pageOne/MobileContent'
import useTabAnimation from '../hooks/useTabAnimation'
import useLogoAnimation from '../hooks/useLogoAnimation'

const store = useStore()
const emit = defineEmits(['openFormPop'])
const { startAnimationTab, tabsIcon } = useTabAnimation();
const { startAnimationLogo, currentIcon } = useLogoAnimation();



/**
 * 打开表单提交弹窗
 * @param code
 */
const openFormPop = (code) => {
  emit('openFormPop',code);
}


/**
 * logo 点击
 * @param index
 */
const clickLogo = (index) => {
  if( store.source === '4'){
    startAnimationTab()
    startAnimationLogo(index,2000)
  }else{
    startAnimationLogo(index,12000)
  }
}


onMounted(() => {
  if( store.source === '4'){
    startAnimationLogo(0,2000)
  }else{
    startAnimationLogo(0,12000)
  }
});


</script>


<style scoped lang='scss'>
.home-page2{
  main {
    .title-box-main{
      width: 100%;
      height: 130px;
      color: #FFFFFF;
      font-size: 34px;
      text-align: center;
      margin-top: 16px;
      .line1{
        font-weight: 700;
        font-size: 54px;
        margin-bottom: 10px;
      }
    }
    .main-content{
      display: flex;
      justify-content: center;
      margin-top: 80px;
      .logo-content{
        width: 900px;
        margin-left: 150px;
        .text-title-box{
          color: #FFF9D7;
          font-size: 24px;
          text-align: left;
          .line1{
            font-size: 36px;
            margin-bottom: 6px;
          }
        }
        .button-page1{
          min-width: 200px;
          display: inline-block;
          height: 46px;
          border-radius: 6px;
          background-color: rgba(255,255,255,0.2);
          border: 1px solid #FFFFFF;
          box-sizing: border-box;
          margin-top: 78px;
          text-align: center;
          line-height: 46px;
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
          padding: 0 10px 0 20px;
          .icon{
            width: 24px;
            height: 24px;
            margin-left: 4px;
            margin-bottom: -6px;
          }
        }

        .tab2-right-box{
          display: flex;
          align-items: center;
          margin-top: 20px;
          img{
            width: 374px;
            margin-right: 30px;
          }
        }
        .tab3-right-box{
          display: flex;
          align-items: center;
          margin-top: 50px;
          img{
            width: 240px;
            margin-right: 30px;
          }
        }
      }

      .pageB-tab-box{
        width: 360px;
        .tab-box{
          margin: 10px auto 0;
          width: 252px;
          height: 70px;
          background-color: rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0 10px 0 20px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 400;
          font-size: 20px;
          cursor: pointer;
          .left, .right{
            display: flex;
            align-items: center;
          }
          img{
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }
        }
        .active{
          background-color: rgba(0, 0, 0, 0.2);
          position: relative;
          color: #FFF9D7;
          font-weight: 400;
          font-size: 20px;
        }
        .active::before{
          content: '';
          display: block;
          width: 6px;
          height: 70px;
          background-color: #FFF9D7;
          position: absolute;
          left: 0;
          top: 0;
        }
        .tab-button{
          width: 252px;
          height: 66px;
          border-radius: 6px;
          background-color: #F2E9D7;
          border: 1px solid #FFFFFF;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          color: #D12734;
          font-weight: 700;
          font-size: 18px;
          margin: 46px auto 0;
          cursor: pointer;
          img{
            width: 56px;
            height: 56px;
          }
        }
      }
    }
  }
  #footer-id{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #D12734;
    z-index: 98;
  }
  footer {
    display: flex;
    justify-content: center;
    min-height: 60px;
    .footer-white{
      width: 98%;
      height: 60px;
      border-radius: 20px 20px 0 0;
      background-color: #FFFFFF;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 24px;
      .red{
        color: #D12734;
        font-weight: 700;
        font-size: 18px;
      }
      .yellow{
        color: #7C530B;
        font-weight: 400;
        font-size: 18px;
      }
      .logo{
        width: 24px;
        height: 24px;
        margin: 0 10px;
      }
      .tips-box{
        color: #FFFFFF;
        font-size: 12px;
        text-align: center;
        top: -30px;
        position: absolute;
        opacity: 0.6;
        line-height: 20px;
      }
    }
  }
}
</style>