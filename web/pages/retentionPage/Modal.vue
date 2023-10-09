
<!--box
  Version: 官网form表单弹窗
  Author: hhd
  Created: 2023/07/28
  Description:
-->

<template>
  <div>
    <div class='modal-container'>
      <div class='modal-header'>
        <img src="~public/retentionPage/titlebg.png" alt="">
      </div>
      <div class='modal-body'>
        <div class='success-box' v-if='submitFlogPop'>
          <img class='logo'
               src='~public/officialWeb/home/success-icon.png' alt=''>
          <div>提交成功</div>
          <div class='bottom-tips'>我们将尽快与您联系</div>
        </div>

        <div class='form-box' v-else>
          <div class='input-box'>
            <input placeholder='请输入并选项您的要推荐企业名称'
                   maxlength='50'
                   @input='getCompanyList'
                   v-model='companyForm.company_name'>
            <div class='company-scroll' v-if='companyScrollFlag'>
              <div v-for='(item,index) of bindSourceList' :key="index"
                @click='selectCompany(item.company_name,item.digest)'>
                {{ item.company_name }}
              </div>
            </div>
          </div>
          <div class='input-box'>
            <input placeholder='请输入手机号码' maxlength='11' v-model='companyForm.phone'>
          </div>
          <div class='input-box'>
            <input placeholder='请输入您的称呼，如：王经理' maxlength='10' v-model='companyForm.name'>
          </div>
          <button class='blue-button' @click='submitFormInfo'>立即加入</button>
          <div class='bottom-tips'>点击立即加入信息按钮，我们将尽快为您推荐</div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, ref} from 'vue'
import { message } from 'ant-design-vue'
import usePingansec from '~/hooks/usePingansec'


export default {
  props: {
    queryData:{
      type:Object,
      default:null
    }
  },

  setup(props, { emit }) {
    const submitFlogPop = ref(false) // 提交成功样式控制
    const companyForm = ref({  // 企业信息
      company_name: '', // 企业名
      phone: '',  // 电话
      name: '',  // 联系人
      digest: ''  // 企业digest
    })
    const bindSourceList = ref([])  // 企业联系数据list
    const companyScrollFlag = ref(false)  // 是否展示企业联想list
    const { firePingansec } = usePingansec()
    const isShowLoading = ref(false)

    //地址携带参数自动回显
    if(!!props.queryData){
      const query = props.queryData
      console.log(query)
      companyForm.value.company_name = query.company_name?query.company_name:''
      companyForm.value.phone = query.user_phone?query.user_phone:''
      companyForm.value.digest = query.digest?query.digest:''
    }

    const config = useRuntimeConfig()

    /**
     * 获取企业联想信息（调用防抖函数）
     */
    const getCompanyList = async () => {
      debounce(async () => {
        try {
          const { data, pending, error, refresh } = await useFetch('https://xbh.shuidi.cn/shuidi_api/b-search', {
            query: {
              action: 'company_name_notice',
              key: companyForm.value.company_name
            }
          })
          const dataInfo = data?._rawValue?.data ?? {}
          const { company_list } = dataInfo
          bindSourceList.value = company_list ?? []
          companyScrollFlag.value = true
        }catch (error){
          console.log(error)
        }
      }, 200)
    }


    /**
     * 防抖函数
     * @param fn 防抖处理的函数
     * @param wait 防抖延迟时间 ms
     */
    let timeout = null
    const debounce = (fn, wait) => {
      // 只要定时器非空，就清掉定时器，重新创建一个新的重新倒计时
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(fn, wait)
    }


    /**
     * 获取企业联想信息（调用防抖函数）
     */
    const submitFormInfo = async () => {
       //打点
       firePingansec(5381)
      if (!companyForm.value.company_name) {
        message.info('请输入企业名称')
        return
      }
      if (!companyForm.value.phone) {
        message.info('请输入手机号码')
        return
      }
      const phoneRegex = /^1[3456789]\d{9}$/
      if (!phoneRegex.test(companyForm.value.phone)) {
        message.info('请输入正确的手机号码')
        return
      }

      let parma = {
        company_name: companyForm.value.company_name,
        phone: companyForm.value.phone,
        digest: companyForm.value.digest,
        source: '5'
      }
      if(companyForm.value.name){
        parma.name = companyForm.value.name
      }

      if(!isShowLoading.value){
        isShowLoading.value = true
      } else {
        return
      }

      try{
        const { data, pending, error, refresh } = await useFetch(config.public.apiBase+'/xinbohui_api/api/home', {
          query: {
            action: 'potential_user_apply',
            ...parma
          },
        })

        isShowLoading.value = false
        const dataInfo = data?._rawValue ?? {}
        if (dataInfo?.status === 0) {
          submitFlogPop.value = true
        }else{
          message.info(dataInfo.message)
        }
      }catch (error){
        console.log(error)
      }
    }


    /**
     * 选中企业
     */
    const selectCompany = (company, digest) => {
      companyScrollFlag.value = false
      companyForm.value.company_name = company
      companyForm.value.digest = digest
    }


    return {
      visible: toRef(props, 'visible'),
      submitFlogPop,
      companyForm,
      bindSourceList,
      companyScrollFlag,
      selectCompany,
      getCompanyList,
      submitFormInfo
    }
  }
}


</script>

<style scoped lang='scss'>

.modal-container {
  width: 390PX;
	background-color: #ffffff;
	box-shadow: 0PX 3PX 12PX 0PX 
		rgba(153, 153, 153, 0.5);
	border-radius: 15PX;
  box-sizing: border-box;

  .modal-body {
    .form-box {
      box-sizing: border-box;
      padding:  0 25PX;
      margin-top: 30PX;

      .input-box {
        margin-bottom: 16PX;
        position: relative;
        display: flex;
        justify-content: center;

        input {
          width: 336PX;
          height: 44PX;
          box-sizing: border-box;
          border-radius: 4PX;
          background-color: #F9F9F9;
          border: 1PX solid #C8C8C8;
          padding: 0 10PX;
        }

        input:focus {
          border: 1PX solid #C8C8C8;
          outline: none;
        }

        .company-scroll {
          position: absolute;
          top: 44PX;
          z-index: 102;
          width: 336PX;
          border-radius: 4PX;
          background-color: #fff;
          box-shadow: 0PX 1PX 3PX 0PX rgba(153, 153, 153, 0.2);
          padding: 10PX;
          box-sizing: border-box;

          div {
            color: #666;
            font-weight: 400;
            font-size: 14PX;
            line-height: 28PX;
            cursor: pointer;
          }
        }
      }

      .blue-button {
        width: 340PX;
        height: 50PX;
        background-color: #1b50f6;
        border-radius: 10PX;
        font-size: 18PX;
        font-weight: normal;
        font-stretch: normal;
        line-height: 18PX;
        letter-spacing: 0PX;
        color: #ffffff;
        cursor: pointer;
        border: none;
      }
      .blue-button:active{
        opacity: 0.7;
      }

      .bottom-tips {
        font-size: 14PX;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24PX;
        letter-spacing: 0PX;
        color: #999999;
        text-align: left;
        margin-top: 28PX;
        padding-bottom: 71PX;
      }
    }
  }

  .success-box {
    color: #926F31;
    font-weight: 500;
    font-size: 23PX;
    width: 100%;
    height: 280PX;
    text-align: center;

    img {
      display: block;
      margin: 100PX auto 0;
      width: 48PX;
      height: 48PX;
    }

    .bottom-tips {
      font-size: 8PX;
      font-weight: normal;
      font-stretch: normal;
      line-height: 18PX;
      letter-spacing: 0PX;
      color: #999999;
      margin-top: 50PX;
    }
  }
}

.modal-header {
  width: 390PX;
	height: 60PX;
  img{
    width: 390PX;
	  height: 60PX;
  }
}


</style>