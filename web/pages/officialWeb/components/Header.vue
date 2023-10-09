


<!--
  Version: 官网header头
  Author: hhd
  Created: 2023/08/04
  Description:
-->

<template>
  <div class='header-page'>
    <header id='header'>
      <div class="left-box">
        <img class="logo" src="public/officialWeb/home/xinbohui-logo2.png" alt="">
      </div>
      <div class="center-box">
        <div class="tab" data-menuanchor="firstPage" @click="tabClick('1')">置顶展示</div>
        <div class="tab" data-menuanchor="secondPage" @click="tabClick('2')">无限曝光</div>
        <div class="tab" data-menuanchor="thirdPage" @click="tabClick('3')">展示说明</div>
        <div class="tab" data-menuanchor="fourthPage" @click="tabClick('4')">证书荣誉</div>
      </div>
      <div class="right-box"></div>
    </header>
  </div>
</template>


<script setup>
const emit = defineEmits(['tabClick'])


/**
 * header tab点击
 * @param index
 */
const tabClick = (index) => {
  emit('tabClick',index);
}
</script>


<style scoped lang='scss'>
.header-page{
  #header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #D12734;
    z-index: 98;
  }
  header {
    height: 12vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    a{
      text-decoration: none;
      color: #FFF9D7;
    }
    .left-box, .right-box{
      width: 460px;
      .logo{
        width: 400px;
        margin-left: 50px;
      }
    }
    .center-box{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .tab{
        opacity: 0.6;
        color: #FFF9D7;
        font-size: 16px;
        text-align: center;
        height: 92px;
        line-height: 92px;
        cursor: pointer;
        white-space: nowrap;
        font-weight: 500;
      }
      .tab:not(:last-child) {
        margin-right: 50px;
      }
      .active{
        opacity: 1;
        position: relative;
      }
      .active::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #FFF9D7;
        margin-bottom: 31px;
      }
    }
  }
}
</style>