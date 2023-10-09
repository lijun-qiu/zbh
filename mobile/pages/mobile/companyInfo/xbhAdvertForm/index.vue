
<!--
  @description:  信博汇广告承接——表单提交页
  @author: hhd (2023-09-01)
  @update:
-->
<script setup>
import { ref, onMounted } from 'vue';
import { showToast, showDialog, allowMultipleToast  } from 'vant';
const { public: { apiBase } } = useRuntimeConfig()
const Route = useRoute()
const {company_name, phone, digest} = Route.query;


let formObj = ref({  // 表单数据
  company_name: company_name ?? '',
  phone: phone ?? '',
  name: '',
  digest: digest ?? ''
})
let bindSourceList = ref([ // 企业联系list
  {company_name: '', company_name_digest: ''}
])
let companyScrollFlag = ref(false)  // 企业联想开关控制
let timeout = '';  // 防抖定时器
let isShowLoading = false // 是否加载中 防止重复提交


onMounted(()=> {
  getCompanyBand(phone)
})


/**
 * 获取绑定企业信息
 */
const getCompanyBand = async (phone) => {
  allowMultipleToast()
  const loading = showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  const {data: Data, pending, error, refresh} = await useFetch(
      apiBase + '/xinbohui_api/api/home', {
        query: {
          action: 'phone_annual_company',  // 待替换
          phone
        }
      })

  const {_rawValue: {data, message: Message, status}} = Data;
  const {company_name, digest} = data ?? {};
  if (status === 0) {
    loading.close()
    formObj.value.company_name = company_name;
    formObj.value.digest = digest;
  } else {
    loading.close()
    Message && showToast(Message)
  }
}


/**
 * 获取企业联想信息
 */
const getCompanyList = () => {
  debounce(async () => {
    const {data: Data, pending, error, refresh} = await useFetch(
      apiBase + '/shuidi_api/b-search', {
      query: {
        action: 'company_name_notice',
        key: formObj.value.company_name,
      }
    })
    const { _rawValue: {data, message:Message, status} } = Data;
    const {company_list} = data ?? {};
    if (status === 0) {
      companyScrollFlag.value = true;
      bindSourceList.value = company_list ?? [];
    } else {
      Message && showToast(Message)
    }
  }, 200)
}


/**
 * 函数防抖
 * @param fn 防抖处理的函数
 * @param wait 防抖延迟时间 ms
 */
const debounce = (fn, wait) => {
  if(timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn, wait)
}


/**
 * 选中企业
 */
const selectCompany = async (company, digest) => {
  companyScrollFlag.value = false;
  formObj.value.company_name = company;
  formObj.value.digest = digest;
}


/**
 * 表单提交
 */
const submitForm = async () => {
  if (!formObj.value.phone) {
    showToast("请输入输入并选择企业名称")
    return
  }
  if (!formObj.value.phone) {
    showToast("请输入手机号")
    return
  }
  if (!/^1\d{10}$/.test(formObj.value.phone)) {
    showToast("请输入正确的手机号")
    return
  }

  if (!isShowLoading) {
    isShowLoading = true
  } else {
    return
  }

  let parma = {
    company_name: formObj.value.company_name,
    phone: formObj.value.phone,
    digest: formObj.value.digest,
    source: '6'
  }
  if (formObj.value.name) {
    parma.name = formObj.value.name
  }

  try {
    const {data: Data, pending, error, refresh} = await useFetch(
        apiBase + '/xinbohui_api/api/home', {
      query: {
        action: 'potential_user_apply',
        ...parma
      },
    })
    isShowLoading = false
    const { _rawValue: {data, message, status} } = Data;
    if (status === 0) {
      creditLog('小程序编辑简介电话页点击广告提交成功表单用户')
      showDialog({
        title: '提示',
        message: '提交成功，我们将尽快与您联系',
        theme: 'round-button',
        confirmButtonColor: '#327bf9',
      }).then(() => {
        formObj.value = {};
      });
    } else {
      message && showToast(message)
    }
  } catch (error) {
    console.log(error)
  }
}


/**
 * kbn打点
 */
const creditLog = async (position) => {
  try {
    const {data: Data} = await useFetch(
        apiBase + '/shuidi_api/credit_butler/credit_plan_log', {
          query: {
            position,
            digest: formObj.value.digest,
            phone: phone,
            where_from: '小程序流程',
          },
        })
  } catch (error) {
    console.log(error)
  }
}

</script>


<template>
  <div class="page">
    <div class="form-card">
      <div class="title-box">
        <img src="~public/companyInfo/card-title1.png"
             alt="我要加入"/>
      </div>
      <div class="form-box">
        <div class="input-box">
          <input v-model="formObj.company_name"
                 v-on:input="getCompanyList"
                 placeholder="请输入并选项您的要推荐企业名称"/>
          <div class="company-scroll" v-if="companyScrollFlag">
            <div
                v-for="item of bindSourceList" :key="item.company_name"
                @click="selectCompany(item.company_name, item.company_name_digest)">
              {{item.company_name}}
            </div>
          </div>
        </div>
        <div class="input-box">
          <input v-model="formObj.phone"
                 type="number"
                 oninput="if(value.length>11)value=value.slice(0,11)"
                 placeholder="请输入手机号码"/>
        </div>
        <div class="input-box">
          <input v-model="formObj.name"
                 type="text"
                 maxlength="10"
                 placeholder="请输入您的称呼，如：王经理"/>
        </div>
      </div>
      <button class="button" @click="submitForm">立即加入</button>
      <div class="tips">点击立即加入信息按钮，我们将尽快为您推荐</div>
    </div>

    <div class="card-group">
      <img src="~public/companyInfo/card-group-bg.png"
           alt="card-group"/>
    </div>

    <div class="bottom-box">
      ©2014 - 2023 水滴信用 版权所有<br>
      许可证号：沪ICP备12039960号-14<br>
      上海凭安征信服务有限公司
    </div>
  </div>
</template>


<style scoped lang="scss">
.page {
  font-weight: normal;
  letter-spacing: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: calc(100vh + 1px);
  background: #f4f4f4 url("../../../../public/companyInfo/head-card-bg.png")
  no-repeat left top / contain;
  .form-card{
    width: 1000px;
    background-color: #ffffff;
    box-shadow: 0 4px 28px 0
    rgba(92, 132, 201, 0.3);
    border-radius: 24px;
    box-sizing: border-box;
    margin: 520px auto 0;
    padding-bottom: 1px;
    .title-box{
      width: 1000px;
      height: 279px;
      background-image: linear-gradient(180deg,
          #ddecff 0%,
          #ffffff 100%),
      linear-gradient(
              #ffffff,
              #ffffff);
      background-blend-mode: normal,
      normal;
      border-radius: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      padding: 40px;
      img{
        margin-top: 12px;
        width: 395px;
        height: 55px;
      }
    }
    .form-box{
      padding: 40px 40px 20px;
      box-sizing: border-box;
      margin: -150px auto 0;
      .input-box{
        width: 100%;
        margin-bottom: 33px;
        font-size: 42px;
        position: relative;
        .company-scroll{
          position: absolute;
          top: 120px;
          left: 0;
          width: 100%;
          background-color: #ffffff;
          border-radius: 18px;
          border: solid 3px #dddddd;
          overflow-y: scroll;
          box-sizing: border-box;
          z-index: 10;
          div{
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            width: 100%;
            height: 130px;
            line-height: 130px;
            color: #333;
            font-size: 42px;
            padding: 0 40px;
            box-sizing: border-box;
            border-bottom: solid 2px #dddddd;
          }
          div:active{
            background-color: #152b2d;
            color: #d1d1d1;
          }
        }
        input{
          padding: 0 40px;
          width: 100%;
          height: 120px;
          background-color: #ffffff;
          border-radius: 15px;
          border: solid 2px #cccccc;
          box-sizing: border-box;
        }
        ::placeholder {
          color: #999999;
          opacity: 0.8;
        }
      }
    }
    .button{
      font-size: 45px;
      font-weight: bold;
      line-height: 120px;
      text-align: center;
      color: #ffffff;
      width: 921px;
      height: 120px;
      background-color: #327bf9;
      border-radius: 15px;
      margin: 0 auto 0;
      border: none;
      display: block;
    }
    .button:active{
      opacity: 0.6;
    }
    .tips{
      font-size: 36px;
      color: #999999;
      line-height: 1;
      margin: 48px auto 60px;
      padding: 0 40px;
    }
  }

  .card-group{
    width: 1050px;
    margin: 30px auto 0;
    img{
      width: 1050px;
      height: 1834px;
    }
  }

  .bottom-box{
    margin: 12px auto 74px;
    font-size: 36px;
    line-height: 60px;
    color: #7387a9;
    text-align: center;
  }
}

</style>