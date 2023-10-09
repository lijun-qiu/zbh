

<!--
  Version: 官网第三页content+footer
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='home-page3'>
    <main>
      <div class='page3-content'>
        <div class='title-box'>
          <div class='line1'>专为守信企业打造的权威信用形象名片</div>
          <div class='line2'>
            <img class='icon'
                 src='public/officialWeb/home/home3-head-icons.png' alt=''>
          </div>
        </div>
        <div class='content-box' @click='openFormPop(5332)' >
          <img class='icon'
               src='public/officialWeb/home/home-page3-card.png' alt=''>
        </div>
      </div>
    </main>
    <footer style='height: 0'></footer>
    <footer id='footer-id'>
      <div class='footer-white'>
        <div class='red'>实体证书、牌匾，线下展示形象</div>
        <img class="logo"
             src="public/officialWeb/home/mouse-icon.png" alt="">
        <div class='yellow'>滚动鼠标查看</div>
      </div>
    </footer>
  </div>
</template>


<script setup>
const emit = defineEmits(['openFormPop'])


/**
 * 打开表单提交弹窗
 * @param code
 */
const openFormPop = (code) => {
  emit('openFormPop',code);
}

</script>


<style scoped lang='scss'>
.home-page3{
  main {
    .page3-content{
      .title-box{
        color: #FFFFFF;
        font-weight: 700;
        font-size: 54px;
        text-align: center;
        .line2{
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 26px;
          .icon{
            width: 821px;
            height: 44px;
          }
        }
      }
      .content-box{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 29px;
        .icon{
          width: 1600px;
          height: 700px;
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