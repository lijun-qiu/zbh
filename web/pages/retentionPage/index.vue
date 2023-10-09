<template>
  <div class="page">
   <div class="header">
      <div class="bg"><img src="~public/retentionPage/headbg.png" alt=""></div>
      <div class="title">立即加入，让你同行的客户看到你</div>
   </div>
   <div class="content_box">
    <div>
      <img class="logo" src="~public/retentionPage/logo.png" alt="">
      <Modal :queryData="queryData"/>
    </div>
    <div class="right_box">
      <div class="top_box">
        <img class="contentbg" src="~public/retentionPage/contentbg.png" alt="">
      </div>
      <div class="button_box">
        <img src="~public/retentionPage/animation.png" alt="">
      </div>
    </div>
   </div>
   <div class="footer">
    ©2014 - 2023 水滴信用 版权所有 许可证号：沪ICP备12039960号-14<br>
    上海凭安征信服务有限公司
   </div>
  </div>
</template>

<script setup lang="js">
  import Modal from './Modal.vue'
  const route = useRoute()

  const queryData = route.query

</script>

<style lang="scss" scoped>
.page{
  .header{
    width: 100%;
    height: 293PX;
    position: relative;
    z-index: 1;
    background: #354df0;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .bg{
      width: 1529PX;
      height: 293PX;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      img{
        width: 1529PX;
        height: 293PX;
      }
    }

 
    .title{
      position: absolute;
      top: 120PX;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      font-size: 45PX;
      font-weight: normal;
      font-stretch: normal;
      line-height: 45PX;
      letter-spacing: 0PX;
      color: #ffffff;
    }
  }

  .content_box{
    display: flex;
    justify-content: center;
    position: relative;
    top: -60PX;
    z-index: 10;

    .logo{
      width: 267PX;
	    height: 45PX;
      position: absolute;
      z-index: 10;
      top: -210PX;
      // left: 356PX;
    }

    .right_box{
      width: 779PX;
      background-color: #ffffff;
      box-shadow: 0PX 3PX 12PX 0PX 
        rgba(153, 153, 153, 0.5);
      border-radius: 15PX;
      margin-left: 31PX;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .top_box{
        width: 100%;
        height: 679PX;
        img{
          width: 100%;
          height: 679PX;
        }
      }
      .button_box{
        width: 740PX;
	      height: 326PX;
        position: absolute;
        top: 312PX;
        animation: slideInFromBottom 1s ease-out;
        img{
          width: 740PX;
	        height: 326PX;
        }
      }
      @keyframes slideInFromBottom {
      0% {
        transform: translateY(100%);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
      }
    }
    }
  }

  .footer{
    font-size: 14PX;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24PX;
    letter-spacing: 0PX;
    color: #999999;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -20PX;
    padding-bottom: 36PX;
    text-align: center;
  }
}
</style>
