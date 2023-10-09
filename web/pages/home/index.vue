<!--
  Version: 新官网首页pc
  Author: hhd
  Created: 2023/08/15
  Description:
-->
<template>
  <div class="page">
    <div class="content">
      <!--吸顶header-->
      <header class="header fade-element" v-show="isStickyHeaderOpen" >
        <div class="header-box">
          <button class="header-left" @click="scrollToSection(0)">
            <img class="logo" src='~public/home/logo-group-head.png' alt=''>
          </button>
          <div class="head-right">
            <div class="tab" :class="{'active' : tabIndex === index}"
                 @click="scrollToSection(index)"
                 v-for="(item,index) in ['首页', '企业服务', ' 免费评定', '关于我们']">
                <a>{{ item }}</a>
            </div>
          </div>
        </div>
      </header>

      <!--蓝色header内容区-->
      <div class="header-content" id="section1">
        <div class="header">
          <div class="header-box">
            <button class="header-left" @click="scrollToSection(0)">
              <img class="logo" src='~public/home/xbh-logo-icons.png' alt=''>
            </button>
            <div class="head-right">
              <div class="tab" :class="{'active' : tabIndex === index}"
                   @click="scrollToSection(index)"
                   v-for="(item,index) in ['首页', '企业服务', ' 免费评定', '关于我们']">
                  <a>{{ item }}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="search-box-content">
          <div class="title-box">
            <div class="title">让优质中小企业脱颖而出</div>
            <img class="icons" src='~public/home/wheat-white-icons.png' alt=''>
          </div>
          <div class="search-box">
              <ClientOnly>
                <a-auto-complete
                    @click="firePingansec(5370)"
                    v-model:value="valueSearch"
                    :dropdown-match-select-width="252"
                    class="auto-complete"
                    style="height: 60PX"
                    :options="dataSource"
                    placeholder="请输入企业名或业务名，在联想列表中选择你要查询的企业"
                    @select="onSelect"
                    @search="handleSearch">
                  <template #option="item">
                    <div style="display: flex; align-items: center;" @click="onSelect(item)">
                      <div style="display: flex; align-items: center; justify-content: center;
                                  margin-right: 10PX; border-radius: 5PX; width: 31PX; height: 31PX">
                        <img v-if="item.logo"
                             style="border-radius: 5PX; max-width: 100%; max-height: 100%;"
                             :src="item.logo" alt="">
                      </div>
                      <span>{{ item.company_name ?? item.tipsError }}</span>
                    </div>
                  </template>
                </a-auto-complete>
                <button class="button-search" @click="clickSearchButton">查找优质企业</button>
              </ClientOnly>
          </div>
        </div>
        <img class="header-bg" src='~public/home/head-bg-groups.png' alt=''>
      </div>

      <!--推荐企业展示-->
      <div class="home-content">
        <div class="content-box">
          <div class="title-box"><span></span>公共信用等级预评定优秀企业展示</div>
          <a-carousel autoplay effect="effect" :autoplaySpeed="3000" v-if="companyBoxList[0]" dotsClass="dotsClass">
            <div v-for="group in groupedCompanyBoxList">
              <div class="banner-box">
                <div class="company-box" v-for="item of group" @click="companyBoxClick(item.digest)">
                  <div class="logo">
                    <img v-if="item.logo" :src="item.logo" alt="">
                  </div>
                  <div class="right">
                    <div class="name">{{item.company_name}}</div>
                    <div class="tips">公共信用等级预评定</div>
                    <img class="icon" src='~public/home/company-right-icon.png' alt=''>
                  </div>
                </div>
              </div>
            </div>
          </a-carousel>
        </div>
      </div>

      <!--企业服务区-->
      <div class="serve-content" id="section2">
        <div class="content-box">
          <div class="title">信博汇企业服务</div>
          <div class="square-box">
            <img class="icon" src='~public/home/serve-group-card.png' alt=''>
          </div>
          <div class="blue-box">
            信博汇为不同特点不同诉求企业提供多种服务 已有
            <span>600000+ </span>家中小企业正在使用信博汇企业服务
          </div>
          <div class="gray-box">*600000+用户是指使用或购买水滴信用平台企业认证服务、立信计划等企业服务的企业数量</div>
        </div>
      </div>

      <!--免费评价区-->
      <div class="evaluate-content" id="section3">
        <div class="content-box">
          <div class="title">免费公共信用等级评定</div>
          <div class="tips-box">
            为促进中小企业信用体系建设，水滴信用依据《中小企业公共信用评价指标体系》标准号：T/CASMES 2-2019<br/>
            采用了法律法规、政府规章、合同契约、道德文化等领域下的5大项36个具体指标作为判定准则，对企业进行公共信用等级预评定
          </div>
          <div class="groups">
            <img class="icon" src='~public/home/excellent-groups.png' alt=''>
          </div>
          <div class="bottom-box">
            <img class="icon" src='~public/home/heart-blue-icon.png' alt=''>
            水滴信用shuidi.cn平台运行6年以来，秉承为企业主免费服务宗旨，持续为诚信企业提供更多发展资源
          </div>
        </div>
      </div>

      <!--关于内容区-->
      <div class="about-content" id="section4">
        <div class="content-box">
          <div class="title">关于我们</div>
          <div class="tips-box">
            信博汇 由 上海凭安征信服务有限公司运营
            <a href='https://www.pinganzhengxin.com' target="_blank">了解更多></a>
          </div>
          <div class="logo-box-content">
            <div class="logo-box">
              <img class="icon" src='~public/home/about-logo1.png' alt=''>
              国家中小企业公共服务示范平台
            </div>
            <div class="logo-box">
              <img class="icon" src='~public/home/about-logo2.png' alt=''>
              人民银行上海总部备案的企业征信机构
            </div>
            <div class="logo-box">
              <img class="icon" src='~public/home/about-logo3.png' alt=''>
              中国中小企业协会副会长单位
            </div>
          </div>
        </div>
      </div>

      <!--底部内容区-->
      <div class="bottom-content">
        <div class="content-box">
          <div class="flex-box">
            <div class="logo">
              <img class="icon" src='~public/home/bottom-logos.png' alt=''>
            </div>
            <div class="info-box">
              <div class="title">联系我们</div>
              <div><global-outlined class="icon" :style="{fontSize: '12PX', color: '#bbc4ce'}"/>shuidi.cn</div>
              <div><phone-outlined class="icon" :style="{fontSize: '12PX', color: '#bbc4ce'}"/>4006-173-173</div>
              <div><mail-outlined class="icon" :style="{fontSize: '12PX', color: '#bbc4ce'}"/>shuidi@pingansec.com</div>
            </div>
            <div class="info-box">
              <div class="title">友情链接</div>
              <div class="url">
                <a href='http://www.ca-sme.org' target="_blank">中国中小企业协会</a>
              </div>
              <div class="url">
                <a href='http://trust.ca-sme.org' target="_blank">中国中小企业协会信用增值服务工作委员会</a>
              </div>
              <div class="url">
                <a href='https://www.pinganzhengxin.com' target="_blank">凭安征信</a>
              </div>
              <div class="url">
                <a href='https://shuidi.cn' target="_blank">水滴信用</a>
              </div>
            </div>
            <div class="qr-box">
              <div class="qr">
                <div class="title">微信公众号</div>
                <img class="icon" src='~public/home/wechat-qr-logo1.png' alt=''>
              </div>
              <div class="qr">
                <div class="title">微信小程序</div>
                <img class="icon" src='~public/home/wechat-qr-logo2.png' alt=''>
              </div>
            </div>
          </div>
          <div class="bottom-tips">
            ©2014 - 2023 水滴信用 版权所有 许可证号：沪ICP备12039960号-14  上海凭安征信服务有限公司
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, computed} from "vue"
import {GlobalOutlined, MailOutlined, PhoneOutlined} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
import usePingansec from '~/hooks/usePingansec'

const { public: { apiBase } } = useRuntimeConfig();
const { firePingansec } = usePingansec()
const [messageApi, contextHolder] = message.useMessage();

const tabIndex = ref(0); // tab当前定位
const valueSearch = ref();  // 搜索input值
const digestCompany = ref(''); // 选中企业digest
const dataSource = ref([]); // 搜索联想数据list
const companyBoxList = ref([]); // 企业推荐list 24家
const isStickyHeaderOpen = ref(false); // 吸顶header是否展示


/**
 * 24家企业拆分为4组
 */
const groupedCompanyBoxList = computed(() => {
  const groupSize = 6;  // 6个元素为一组
  const list = companyBoxList.value.slice(0, 24); // 只取前 24 个元素
  const groups = [];
  for (let i = 0; i < list.length; i += groupSize) {
    groups.push(list.slice(i, i + groupSize));
  }
  return groups;
});



/**
 * 初始化页面
 */
const initPage = async () => {
  firePingansec(5366)
  handleScroll()
  try {
    const {data, pending, error, refresh} = await useFetch(apiBase +'/xinbohui_api/api/home', {
      query: {
        action: 'display_company',
      }
    })
    companyBoxList.value = data?._rawValue?.data ?? {}
  } catch (error) {
    console.log(error)
  }
}


onMounted(() => {
  setTimeout(()=> initPage() ,0)
})


/**
 * 企业联想选中
 * @param value
 */
const onSelect = value => {
  const {digest, company_name} = value;
  valueSearch.value = company_name;
  digestCompany.value = digest;
}


/**
 * 企业联想监听输入事件
 * @param val
 * @return {boolean}
 */
const handleSearch = val => {
  if(!val) return false
  debounce(async () => {
    try {
      const { data, pending, error, refresh } = await useFetch(apiBase + '/shuidi_api', {
        query: {
          action: 'company_name_notice',
          with_logo: '2',
          come_from: 'xbh',
          company_name: val
        }
      })
      const dataInfo = data?._rawValue?.data ?? {}
      const { company_list } = dataInfo
      const errorList = [{tipsError: '根据搜索内容未查见被评为优秀的企业，请重新输入'}]
      dataSource.value = company_list && company_list.length > 0 ? company_list : errorList
    }catch (error){
      console.log(error)
    }
  }, 200)
};


/**
 * 防抖函数
 * @param fn 防抖处理的函数
 * @param wait 防抖延迟时间 ms
 */
let timeout = null
const debounce = (fn, wait) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}


/**
 * 搜索按钮点击
 */
const clickSearchButton = () => {
  firePingansec(5371)
  if(!digestCompany.value){
    message.info('请输入企业名或业务名，在联想列表中选择你要查询的企业 !');
    return
  }
  window.open('https://shuidi.cn/company-' + digestCompany.value + '.html', '_blank');
}


/**
 * 企业推荐点击
 * @param digest
 */
const companyBoxClick = (digest) => {
  firePingansec(5372)
  window.open('https://shuidi.cn/company-' + digest + '.html', '_blank');
}


/**
 * 监听滚动位置
 */
const handleScroll = ()=> {
  window.addEventListener('scroll', ()=>{
    isStickyHeaderOpen.value = window.scrollY > 420;
  });
}


/**
 * tab锚点跳转
 * @param id
 */
const scrollToSection = (id) => {
  tabIndex.value = id;

  if(id === 1){
    firePingansec(5367)
  }else if(id === 2){
    firePingansec(5368)
  }else if(id === 3){
    firePingansec(5369)
  }

  const element = document.querySelector('#section' + (id+1))
  const top = element.offsetTop ?? 0;

  window.scrollTo({
    top: id && top + - 60,
    behavior: 'smooth'
  });
}

</script>

<style scoped lang="scss">
.page {
  .content {
    background-color: #f8f8f8;
    position: relative;
    width: 100vw;

    .header {
      width: 100%;
      height: 74PX;
      background-color: #ffffff;
      box-shadow: 0 1PX 15PX 0 #efefef;
      position: fixed;
      top: 0;
      z-index: 100;
      box-sizing: border-box;

      .header-box {
        max-width: 1200PX;
        height: 74PX;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-left{
          height: 45PX;
          width: 267PX;
          border: none;
          background: none;
          cursor: pointer;
          .logo {
            height: 45PX;
            width: 267PX;
          }
        }


        .head-right {
          display: flex;
          justify-content: space-between;
          width: 400PX;
          white-space: nowrap;
          margin-left: 40PX;

          .tab {
            height: 74PX;
            line-height: 74PX;
            font-size: 16PX;
            font-weight: bold;
            color: #333333;
            cursor: pointer;
            user-select: none;
          }

          .active {
            color: #1f81f8;
          }
        }
      }
    }

    .header-content {
      width: 100%;
      height: 420PX;
      background-image: linear-gradient(90deg,
          #005af0 0%,
          #0048ff 100%),
      linear-gradient(
              #004eff,
              #004eff);
      background-blend-mode: normal, normal;
      position: relative;

      .header {
        width: 100%;
        height: 74PX;
        background: none;
        box-shadow: none;
        position: relative;

        .header-box {
          max-width: 1200PX;
          height: 74PX;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .header-left{
            height: 45PX;
            width: 267PX;
            border: none;
            background: none;
            cursor: pointer;
            .logo {
              height: 45PX;
              width: 267PX;
            }
          }

          .head-right {
            display: flex;
            justify-content: space-between;
            width: 400PX;
            white-space: nowrap;
            margin-left: 40PX;

            .tab {
              height: 74PX;
              line-height: 74PX;
              font-size: 16PX;
              font-weight: bold;
              color: #fff;
              opacity: 0.7;
              cursor: pointer;
            }

            .active {
              opacity: 1;
            }
          }
        }
      }

      .search-box-content {
        position: relative;
        z-index: 2;
        margin-top: 50PX;

        .title-box {
          font-size: 60PX;
          font-weight: bold;
          color: #ffffff;
          text-align: center;

          .icons {
            display: block;
            margin: 30PX auto 0;
            height: 24PX;
            width: 494PX;
          }
        }

        .search-box{
          margin-top: 40PX;
          display: flex;
          justify-content: center;

          .auto-complete{
            width: 734PX;
            height: 60PX;
          }
          .button-search{
            width: 166PX;
            height: 60PX;
            background-color: #fd943a;
            border-radius: 0 9PX 9PX 0;
            font-size: 22PX;
            color: #ffffff;
            text-align: center;
            line-height: 60PX;
            cursor: pointer;
            margin-left: -2PX;
            border: none;
          }

          .company-box-list{
            display: flex;
            align-items: center;
            font-size: 14PX;
            img{
              width: 31PX!important;
              height: 31PX;
              background-color: #7db3d9;
              border-radius: 5PX;
              margin-right: 10PX;
            }
          }
        }
      }

      .header-bg {
        position: absolute;
        bottom: 0;
        left: 47%;
        transform: translateX(-50%);
        height: 359PX;
        width: 1609PX;
      }
    }


    .home-content{
      width: 100%;
      height: 327PX;
      background-color: #ffffff;
      .content-box{
        width: 1200PX;
        margin: 0 auto;
        .title-box{
          display: flex;
          align-items: center;
          height: 63PX;
          line-height: 63PX;
          font-size: 18PX;
          font-weight: bold;
          color: #1f81f8;
          span{
            width: 4PX;
            height: 16PX;
            background-color: #1f81f8;
            border-radius: 2PX;
            display: block;
            margin-right: 16PX;
            margin-bottom: -2PX;
          }
        }
        .banner-box{
          width: 1200PX;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          color: #333333;
          .company-box{
            width: 385PX;
            height: 100PX;
            background-color: #f5f7fb;
            border-radius: 9PX;
            box-sizing: border-box;
            padding: 15PX;
            display: flex;
            align-items: center;
            margin-bottom: 15PX;
            cursor: pointer;
            .logo{
              width: 71PX;
              height: 71PX;
              background-color: #7db3d9;
              margin-right: 11PX;
              border-radius: 4PX;
              img{
                width: 71PX;
                height: 71PX;
                border-radius: 4PX;
              }
            }
            .right{
              width: 300PX;
              position: relative;
              .name{
                font-size: 18PX;
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-sizing: border-box;
                padding-right: 15PX;
              }
              .tips{
                font-size: 16PX;
                font-weight: normal;
                color: #999999;
                margin-top: 8PX;
              }
              .icon{
                position: absolute;
                width: 65PX;
                height: 35PX;
                bottom: -4PX;
                left: 150PX;
              }
            }
          }
          .company-box:hover{
            background-color: #e5eaf5;
            color: #1f81f8;
          }
        }

      }
    }

    .serve-content{
      width: 100%;
      height: 530PX;
      background-color: #f8f8f8;
      .content-box{
        margin: 0 auto;
        width: 1200PX;
        padding-top: 50PX;
        .title{
          font-size: 30PX;
          font-weight: bold;
          color: #000000;
          text-align: center;
        }
        .square-box{
          width: 1200PX;
          margin-top: 36PX;
          display: flex;
          justify-content: center;
          .icon{
            height: 256PX;
            width: 1227PX;
          }
        }
        .blue-box{
          font-size: 16PX;
          color: #1f81f8;
          text-align: center;
          margin-top: 20PX;
          span{
            font-size: 30PX;
            font-weight: bold;
          }
        }
        .gray-box{
          margin-top: 20PX;
          text-align: center;
          font-size: 14PX;
          color: #999999;
        }
      }
    }

    .evaluate-content{
      width: 100%;
      height: 530PX;
      background-color: #ffffff;
      .content-box{
        margin: 0 auto;
        width: 1200PX;
        padding-top: 50PX;
        .title{
          font-size: 30PX;
          font-weight: bold;
          color: #000000;
          text-align: center;
        }
        .tips-box{
          margin-top: 10PX;
          text-align: center;
          font-size: 14PX;
          line-height: 24PX;;
          color: #999999;
        }
        .groups{
          margin-top: 20PX;
          display: flex;
          justify-content: center;
          .icon{
            height: 284PX;
          }
        }
        .bottom-box{
          display: flex;
          align-items: center;
          margin-top: 10PX;
          justify-content: center;
          font-size: 16PX;
          font-weight: bold;
          color: #1f81f8;
          .icon{
            width: 21PX;
            height: 20PX;
            margin-right: 8PX;
          }
        }
      }
    }

    .about-content {
      width: 100%;
      height: 284PX;
      background-color: #f8f8f8;
      .content-box {
        margin: 0 auto;
        width: 1200PX;
        padding-top: 50PX;

        .title {
          font-size: 30PX;
          font-weight: bold;
          color: #000000;
          text-align: center;
        }

        .tips-box {
          margin-top: 10PX;
          text-align: center;
          font-size: 14PX;
          line-height: 24PX;;
          color: #999999;
          span{
            font-size: 16PX;
            color: #1f81f8;
            cursor: pointer;
            user-select: none;
          }
          a{
            font-size: 16PX;
            color: #1f81f8;
            cursor: pointer;
            user-select: none;
            text-decoration: none;
          }
        }
        .logo-box-content{
          display: flex;
          justify-content: space-between;
          margin-top: 30PX;
          .logo-box{
            width: 385PX;
            height: 75PX;
            background-color: #ffffff;
            border-radius: 9PX;
            border: solid 1PX #e6e6e6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16PX;
            color: #040000;
            img{
              height: 34PX;
              margin-right: 23PX;
            }
          }
        }
      }
    }

    .bottom-content{
      width: 100%;
      height: 300PX;
      background-color: #2d3237;
      .content-box {
        margin: 0 auto;
        width: 1200PX;
        padding-top: 50PX;
        .flex-box{
          display: flex;
          justify-content: space-between;
          .logo{
            img{
              height: 133PX;
            }
          }
          .info-box{
            font-size: 14PX;
            color: #ffffff;
            .title{
              color: #bbc4ce;
            }
            div{
              display: flex;
              align-items: center;
              margin-bottom: 10PX;
              .icon{
                margin-right: 10PX;
              }
            }
            .url{
              cursor: pointer;
              user-select: none;
              a{
                text-decoration: none;
                color: inherit;
              }
            }
          }
          .qr-box{
            display: flex;
            justify-content: space-between;
            width: 222PX;
            text-align: center;
            .title{
              font-size: 14PX;
              color: #bbc4ce;
              margin-bottom: 10PX;
            }
            .icon{
              width: 95PX;
              height: 95PX;
            }
          }
        }
        .bottom-tips{
          text-align: center;
          font-size: 13PX;
          color: #bbc4ce;
          margin-top: 50PX;
        }
      }
    }

  }
}


</style>
<style lang="scss">

.search-box{
  .ant-select-selection-search-input, .ant-select-selector {
    height: 60PX!important;
    border-radius: 6PX 0 0 6PX!important;
    border: none!important;
    input{
      line-height: 60PX!important;
    }
    .ant-select-selection-placeholder {
      line-height: 60PX!important;
    }
  }
}
.home-content{
  .slick-dots{
    bottom: -20PX!important;
    li{
      button{
        background-color: rgba(31, 129, 248, 0.5) !important;
        width: 6PX!important;
        height: 6PX!important;
        border-radius: 50%!important;
      }

    }
    .slick-active{
      button{
        background-color: #1f81f8!important;
        height: 5PX!important;
        border-radius: 2PX!important;
        width: 20PX!important;
      }
    }
  }
}

</style>