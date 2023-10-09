
<!--
  Version: 浏览器logo box 组
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='mobile-content'>
    <img class='line-icon'
         src='public/officialWeb/home/tips-line-icon.png' alt=''>
    <div class='box' v-if="currentIcon === '1'">
      <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page1.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page2.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page2.png' alt=''>
          <img class='hand hand1'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page3.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page3.png' alt=''>
          <img class='hand hand2'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page4.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-page4.png' alt=''>
          <img class='hand hand3'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/headline-end-page.png' alt=''>
        </div>
      </a-carousel>
    </div>
    <div class='box' v-else-if="currentIcon === '2'">
      <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page1.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page2.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page2.png' alt=''>
          <img class='hand hand1'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page3.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page3.png' alt=''>
          <img class='hand hand2'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page4.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-page4.png' alt=''>
          <img class='hand hand3'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/uc-end-page.png' alt=''>
        </div>
      </a-carousel>
    </div>
    <div class='box' v-else-if="currentIcon === '3'">
      <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page1.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page2.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page2.png' alt=''>
          <img class='hand hand1'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page3.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page3.png' alt=''>
          <img class='hand hand4'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page4.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/quark-page4.png' alt=''>
          <img class='hand hand3'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/kuake-end-page.png' alt=''>
        </div>
      </a-carousel>
    </div>
    <div class='box' v-else-if="currentIcon === '4'">
      <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page1.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page2.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page2.png' alt=''>
          <img class='hand hand1'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page3.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page3.png' alt=''>
          <img class='hand hand2'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page4.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-page4.png' alt=''>
          <img class='hand hand3'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/box360-end-page.png' alt=''>
        </div>
      </a-carousel>
    </div>
    <div class='box' v-else-if="currentIcon === '5'">
      <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page1.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page2.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page2.png' alt=''>
          <img class='hand hand1'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page3.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page3.png' alt=''>
          <img class='hand hand2'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page4.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-page4.png' alt=''>
          <img class='hand hand3'
               src='public/officialWeb/home/figer-icon.png' alt=''>
        </div>
        <div>
          <img class='mobile-img'
               src='public/officialWeb/home/mokey-end-page.png' alt=''>
        </div>
      </a-carousel>
    </div>
  </div >
</template>



<script setup>

const props = defineProps({
  currentIcon: { // 浏览器 logo 类型
    type: String,
    default: '1'
  }
})

</script>

<style scoped lang='scss'>
.mobile-content{
  width: 398px;
  height: 650px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.5);
  padding: 13px;
  box-sizing: border-box;
  position: relative;
  .box{
    height: 620px;
    border-radius: 10px;
    overflow: hidden;
    .mobile-img{
      border-radius: 10px;
      width: 372px;
      height: auto;
    }
    .hand{
      width: 100px;
      height: 100px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .hand1{
      left: 60px;
      top: 64px;
    }
    .hand2{
      left: 150px;
      top: 8px;
    }
    .hand3{
      left: 150px;
      top: 150px;
    }
    .hand4{
      left: 150px;
      top: 208px;
    }
  }
  .line-icon{
    position: absolute;
    top: 28px;
    right: -80px;
    width: 150px;
    z-index: 2;
  }
  .mobile-title-box{
    position: absolute;
    top: 22px;
    left: 26px;
    display: flex;
    align-items: center;
    .logo{
      width: 26px;
      margin: 0 6px;
    }
  }
}
</style>