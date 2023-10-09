

<!--
  Version: 官网第二页content+footer
  Author: hhd
  Created: 2023/08/03
  Description:
-->

<template>
  <div class='home-page2'>
    <main>
      <div class='page2-content'>
        <div class='left-box-content'>
          <div class='mobile-page'>
            <div class='top-box'>
              <div>今日头条</div>
              <img class='icon'
                   src='public/officialWeb/home/play-button-icon.png' alt=''>
              <img class='line'
                   src='public/officialWeb/home/tips-line-icon2.png' alt=''>
            </div>
            <div class='mobile' >
              <div class='mobile-mark'></div>
              <a-carousel autoplay effect="fade" :autoplaySpeed="1500">
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page2.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page5.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page3.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page7.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page4.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-page6.png' alt=''>
                </div>
                <div>
                  <img class='icon'
                       src='public/officialWeb/home/headline-end-page.png' alt=''>
                </div>
              </a-carousel>
            </div>
          </div>
          <div class='mobile-page mobile-page2'>
            <div class='top-box'>
              <div>UC浏览器</div>
              <img class='icon'
                   src='public/officialWeb/home/play-button-icon.png' alt=''>
              <img class='line'
                   src='public/officialWeb/home/tips-line-icon2.png' alt=''>
            </div>
            <div class='mobile' >
              <div class='mobile-mark'></div>
              <img class='icon'
                   src='public/officialWeb/home/uc-page1.png' alt=''>
            </div>
          </div>
          <div class='mobile-page mobile-page2 mobile3'>
            <div class='top-box'>
              <div>夸克</div>
              <img class='icon'
                   src='public/officialWeb/home/play-button-icon.png' alt=''>
              <img class='line'
                   src='public/officialWeb/home/tips-line-icon2.png' alt=''>
            </div>
            <div class='mobile'  >
              <div class='mobile-mark'></div>
              <img class='icon'
                   src='public/officialWeb/home/quark-page1.png' alt=''>
            </div>
          </div>
          <div class='mobile-page mobile-page2 mobile4'>
            <div class='top-box'>
              <div>360浏览器</div>
              <img class='icon'
                   src='public/officialWeb/home/play-button-icon.png' alt=''>
              <img class='line'
                   src='public/officialWeb/home/tips-line-icon2.png' alt=''>
            </div>
            <div class='mobile' >
              <div class='mobile-mark'></div>
              <img class='icon'
                   src='public/officialWeb/home/box360-page1.png' alt=''>
            </div>
          </div>
          <div class='mobile-page mobile-page2 mobile5'>
            <div class='top-box'>
              <div>悟空搜索</div>
              <img class='icon'
                   src='public/officialWeb/home/play-button-icon.png' alt=''>
              <img class='line'
                   src='public/officialWeb/home/tips-line-icon2.png' alt=''>
            </div>
            <div class='mobile'  >
              <div class='mobile-mark'></div>
              <img class='icon'
                   src='public/officialWeb/home/mokey-page1.png' alt=''>
            </div>
          </div>
        </div>
        <div class='right-box-content'>
          <div class='text-box'>
            <div class='line1'>随时随地</div>
            <div class='line2'>首页直达通道畅通无阻</div>
          </div>
          <div class='button-box-red' @click='openFormPop(5331)'>
            加入专区，让客户随时随地找到我
            <img class='icon' src='public/officialWeb/home/right-arrow.png' alt=''>
          </div>
        </div>
      </div>
    </main>
    <footer style='height: 0'></footer>
    <footer id='footer-id'>
      <div class='footer-white footer-red'>
        <div class='red'>形象权威可信对成交影响重大</div>
        <img class="logo"
             src="public/officialWeb/home/mouse-icon2.png" alt="">
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
.home-page2{
  main {
    .page2-content{
      width: 98%;
      height: 100%;
      border-radius: 20px;
      background-color: #FFFFFF;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      .left-box-content{
        position: relative;
        width: 660px;
        height: 660px;
        margin: 80px 0;
        .mobile-page{
          position: relative;
          z-index: 10;
          width: 208px;;
          .top-box{
            color: #D12734;
            font-weight: 500;
            font-size: 14px;
            position: relative;
            padding-left: 30px;
            box-sizing: border-box;
            .icon{
              height: 19px;
              margin-top: 5px;
              margin-bottom: 16px;
            }
            .line{
              width: 12px;
              height: 60px;
              position: absolute;
              left: 10px;
              top: 0;
            }
          }
          .mobile{
            width: 208px;
            height: 350px;
            position: relative;
            overflow: hidden;
            box-shadow: 2px 2px 8px 0 rgba(0,0,0,0.3);
            border-radius: 6px;
            .icon{
              width: 208px;
            }
          }
          .mobile-mark{
            width: 208px;
            height: 100%;
            position: absolute;
          }
        }
        .mobile-page2{
          position: absolute;
          top: 53px;
          left: 110px;
          z-index: 9;
          .top-box{
            margin-left: 100px;
            opacity: 0.8;
          }
          .mobile-mark{
            background-color: rgba(255,255,255, 0.2);
          }
        }
        .mobile3{
          position: absolute;
          top: 104px;
          left: 216px;
          z-index: 8;
          .top-box{
            opacity: 0.6;
          }
          .mobile-mark{
            background-color: rgba(255,255,255, 0.4);
          }
        }
        .mobile4{
          position: absolute;
          top: 150px;
          left: 326px;
          z-index: 7;
          .top-box{
            opacity: 0.4;
          }
          .mobile-mark{
            background-color: rgba(255,255,255, 0.6);
          }
        }
        .mobile5{
          position: absolute;
          top: 200px;
          left: 432px;
          z-index: 6;
          .top-box{
            opacity: 0.2;
          }
          .mobile-mark{
            background-color: rgba(255,255,255, 0.8);
          }
        }
      }
      .right-box-content{
        margin-left: 100px;
        .text-box{
          color: #D12734;
          font-weight: 700;
          font-size: 44px;
          .line1{
            font-size: 76px;
            margin-bottom: 4px;
          }
        }
        .button-box-red{
          min-width: 200px;
          height: 46px;
          border-radius: 6px;
          background-color: #D12734;
          text-align: center;
          line-height: 46px;
          color: #FFFFFF;
          font-weight: 400;
          font-size: 18px;
          margin-top: 30px;
          cursor: pointer;
          display: inline-block;
          padding: 0 0 0 10px;
          .icon{
            width: 24px;
            height: 24px;
            margin-left: 0;
            margin-bottom: -6px;
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
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      .logo{
        width: 24px;
        height: 24px;
        margin: 0 10px;
      }
    }
    .footer-red{
      margin-top: 36px;
      .red{
        color: #fff;
        font-weight: 700;
        font-size: 18px;
      }
      .yellow{
        color: #FFF9D7;
        font-weight: 400;
        font-size: 18px;
      }
    }
  }
}
</style>