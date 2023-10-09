
<!--
  Version: 浏览器logo box 组
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='logo-icons-box'>
    <div class='logo-box' :class="{ 'show': props.currentIcon === '1' }" @click='clickLogo(0)'>
      <img class='icon'
           src='public/officialWeb/home/headlines-icon.png' alt=''>
      <div>今日头条</div>
      <div class='active-tips' v-show="props.currentIcon === '1'">
        <img class='icon' src='public/officialWeb/home/download-icon.png' alt=''> 72亿-国民都在用
      </div>
    </div>
    <div class='logo-box' :class="{ 'show': props.currentIcon === '2' }" @click='clickLogo(1)'>
      <img class='icon'
           src='public/officialWeb/home/uc-icon.png' alt=''>
      <div>UC浏览器</div>
      <div class='active-tips' v-show="props.currentIcon === '2'">
        <img class='icon' src='public/officialWeb/home/download-icon.png' alt=''>43亿-全球主流，阿里旗下
      </div>
    </div>
    <div class='logo-box' :class="{ 'show': props.currentIcon === '3' }" @click='clickLogo(2)'>
      <img class='icon'
           src='public/officialWeb/home/kuake-icon.png' alt=''>
      <div>夸克浏览器</div>
      <div class='active-tips' v-show="props.currentIcon === '3'">
        <img class='icon' src='public/officialWeb/home/download-icon.png' alt=''> 8.9亿-智能搜索，阿里旗下
      </div>
    </div>
    <div class='logo-box' :class="{ 'show': props.currentIcon === '4' }" @click='clickLogo(3)'>
      <img class='icon'
           src='public/officialWeb/home/box-360-icon.png' alt=''>
      <div>360浏览器</div>
      <div class='active-tips' v-show="props.currentIcon === '4'">
        <img class='icon' src='public/officialWeb/home/download-icon.png' alt=''>1.1亿-办公常用
      </div>
    </div>
    <div class='logo-box' :class="{ 'show': props.currentIcon === '5' }" @click='clickLogo(4)'>
      <img class='icon'
           src='public/officialWeb/home/monkey-icon.png' alt=''>
      <div>悟空浏览器</div>
      <div class='active-tips' v-show="props.currentIcon === '5'">
        <img class='icon' src='public/officialWeb/home/download-icon.png' alt=''>8453万-年轻人爱用，抖音旗下
      </div>
    </div>
  </div>
</template>



<script setup>

const props = defineProps({
  currentIcon: { // logo类型
    type: String,
    default: '1'
  }
})
const emit = defineEmits(['clickLogo'])


/**
 * logo点击
 * @param code
 */
const clickLogo = (index) => {
  emit('clickLogo',index);
}

</script>

<style scoped lang='scss'>
.logo-icons-box{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 34px;
  .logo-box{
    color: #FFFFFF;
    font-size: 16px;
    text-align: center;
    opacity: 0.5;
    position: relative;
    cursor: pointer;
    .icon{
      width: 64px;
      height: 64px;
      margin-bottom: 8px;
    }
    .active-tips{
      position: absolute;
      left: 50%;
      bottom: -56px;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      color: #FFF9D7;
      font-size: 14px;
      min-width: 100px;
      white-space: nowrap;
      height: 28px;
      line-height: 28px;
      background-color: rgba(255, 255, 255, 0.35);
      margin-top: 12px;
      padding: 4px;
      box-sizing: border-box;
      border-radius: 4px;
      img{
        width: 17px;
        height: 17px;
        margin-right: 4px;
        margin-bottom: -2px;
      }
    }
    .active-tips::after{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -7.5px;
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 8px solid rgba(255, 255, 255, 0.35);
    }
  }
  .show{
    opacity: 1;
  }
}
</style>