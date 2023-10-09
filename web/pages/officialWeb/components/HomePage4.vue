
<!--
  Version: 官网第四页content+footer
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='home-page4'>
    <main>
      <div class='page4-content'>
        <div class='title-box'>加入专区并签署《信用承诺书》的单位可免费领取实体牌匾及荣誉证书</div>
        <div class='content-box'>
          <div class='left-box'>
            <div class='tips-red'>金属荣誉牌匾</div>
            <div class='img-box'>
              <img class='icon'
                   src='public/officialWeb/home/cridet-plaque-icon.png' alt=''>
            </div>
          </div>
          <div class='left-box right-box'>
            <div class='tips-red'>荣誉证书</div>
            <div class='img-box'>
              <img class='icon'
                   src='public/officialWeb/home/plaque-icons2.png' alt=''>
            </div>
          </div>
        </div>
        <div class='button-box-page4'>
          <div class='button-box-red' @click='openFormPop(5333)'>
            加入专区，领取荣誉
            <img class='icon' src='public/officialWeb/home/right-arrow.png' alt=''>
          </div>
        </div>
        <div class='go-home-button' @click="tabClick('1')">
          <div>返回首页</div>
          <img class='icon'
               src='public/officialWeb/home/arrow-top-icon.png' alt=''>
        </div>
      </div>
    </main>
    <footer>
      <div class='footer-page4'>
        <div class='text-line1' @click='openPingansec'>国家中小企业公共服务示范平台 信用示范专区  由  上海凭安征信服务有限公司运营 ></div>
        <div class='text-line2'>
          <div class='box'>官方备案征信机构</div>
          <div class='box'>国家中小企业公共服务示范平台单位</div>
          <div class='box'>中国中小企业副会长单位</div>
        </div>
        <div class='text-line3'>©2014 - 2023 水滴信用 版权所有 许可证号：沪ICP备12039960号-14</div>
      </div>
    </footer>
  </div>
</template>



<script setup>
const emit = defineEmits(['tabClick', 'openFormPop'])


/**
 * 打开表单提交弹窗
 * @param code
 */
const openFormPop = (code) => {
  emit('openFormPop',code);
}


/**
 * 返回首页
 */
const tabClick = (index) => {
  emit('tabClick',index);
};


/**
 * 打开凭安官网
 */
const openPingansec = () => {
  location.href = 'https://www.pinganzhengxin.com/'
}


</script>

<style scoped lang='scss'>
.home-page4{
  main {
    .page4-content{
      width: 98%;
      height: 680px;
      border-radius: 20px;
      background-color: #FFFFFF;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
      margin:0 auto 0;
      padding-top: 1px;
      position: relative;
      .title-box{
        color: #D12734;
        font-weight: 700;
        font-size: 38px;
        text-align: center;
        margin-top: 30px;
      }
      .content-box{
        display: flex;
        justify-content: center;
        margin-top: 80px;
        .left-box{
          .tips-red{
            height: 34px;
            width: 108px;
            border-radius: 6px;
            background-color: #D12734;
            box-sizing: border-box;
            padding: 4px;
            text-align: center;
            line-height: 25px;
            color: #FFFFFF;
            font-weight: 400;
            font-size: 16px;
            margin-bottom: 18px;
          }
          .img-box{
            .icon{
              width: 400px;
            }
          }
        }
        .right-box{
          margin-left: 160px;
          .img-box{
            .icon{
              width: 540px;
            }
          }
        }
      }
      .button-box-red{
        width: 360px;
        height: 46px;
        border-radius: 6px;
        background-color: #D12734;
        text-align: center;
        line-height: 46px;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0 0 10px;
        margin: 50px auto;
        .icon{
          width: 24px;
          height: 24px;
          margin-left: 0;
        }
      }

      .go-home-button{
        position: absolute;
        right: 0;
        top: 300px;
        width: 94px;
        height: 76px;
        border-radius: 10px;
        background-color: #F2E9D7;
        border: 1px solid #ECD0A3;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
        color: #7C530B;
        font-weight: 500;
        font-size: 15px;
        box-sizing: border-box;
        padding-top: 6px;
        text-align: center;
        cursor: pointer;
        .icon{
          display: block;
          margin: 6px auto;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    min-height: 60px;
    .footer-page4{
      .text-line1{
        margin-top: 35px;
        color: #FFFFFF;
        font-weight: 700;
        font-size: 16px;
        text-align: center;
      }
      .text-line2{
        margin-top: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
          width: 370px;
          height: 70px;
          border-radius: 6px;
          background-color: #D12734;
          border: 1px solid #FFF9D7;
          color: #FFF9D7;
          font-weight: 700;
          font-size: 22px;
          text-align: center;
          line-height: 70px;
          margin-left: 18px;
        }
      }
      .text-line3{
        color: #FFFFFF;
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        margin-top: 46px;
      }
    }
  }
}
</style>