
<!--
  Version: 官网form表单弹窗
  Author: hhd
  Created: 2023/07/28
  Description:
-->

<template>
  <div v-if='visible'>
    <div class='modal-overlay' @click='close'></div>
    <div class='modal-container'>
      <div class='modal-header'>
        <div class='title'>
          <div class='line1'>5大APP超7亿用户覆盖</div>
          <div class='line2'>首页置顶展示企业，超40万中小企业已加入</div>
        </div>
        <button class='modal-close' @click='close'>
          <img src='public/officialWeb/home/pop-close.svg' alt=''>
        </button>
      </div>
      <div class='modal-body'>
        <div class='success-box' v-if='submitFlogPop'>
          <img class='logo'
               src='public/officialWeb/home/success-icon.png' alt=''>
          <div>提交成功</div>
          <div class='red-button' @click='close'>确认</div>
          <div class='bottom-tips'>我们将尽快与您联系</div>
        </div>

        <div class='form-box' v-else>
          <div class='title-box'>留下联系方式，立即加入</div>
          <div class='input-box'>
            <input placeholder='输入并选择您的企业名称'
                   maxlength='50'
                   v-on:input='getCompanyList'
                   v-model='companyForm.company_name'>
            <div class='company-scroll' v-if='companyScrollFlag'>
              <div
                v-for='item of bindSourceList'
                @click='selectCompany(item.company_name,item.digest)'>
                {{ item.company_name }}
              </div>
            </div>
          </div>
          <div class='input-box'>
            <input placeholder='输入您的手机号码' maxlength='11' v-model='companyForm.phone'>
          </div>
          <div class='input-box'>
            <input placeholder='填写您的称呼，如：王经理' maxlength='10' v-model='companyForm.name'>
          </div>
          <button class='red-button' @click='submitFormInfo'>提交信息</button>
          <div class='bottom-tips'>点击提交信息按钮，我们将尽快与您联系</div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { toRef, ref} from 'vue'
import { message } from 'ant-design-vue'
import { useStore } from "~/store/index";
import usePingansec from '~/hooks/usePingansec'


export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Modal Title'
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
    const store = useStore()  // pina注入
    const { firePingansec } = usePingansec()
    const isShowLoading = ref(false)


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
        source: store.source === '4' ? 3 : 1
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
        const { data, pending, error, refresh } = await useFetch('https://xbh.shuidi.cn/xinbohui_api/api/home', {
          query: {
            action: 'potential_user_apply',
            ...parma
          },
        })

        isShowLoading.value = false
        const dataInfo = data?._rawValue ?? {}
        if (dataInfo?.status === 0) {
          submitFlogPop.value = true
          if(store.source === '4'){
            firePingansec(5343) // 水滴广告B版本提交成功
          }else{
            firePingansec(5337)
          }
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


    /**
     * 弹窗关闭
     */
    function close() {
      emit('update:visible', false)
    }


    return {
      visible: toRef(props, 'visible'),
      close,
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10PX;
  z-index: 101;
  min-width: 376PX;

  .modal-body {
    .form-box {
      box-sizing: border-box;
      padding: 20PX;
      min-width: 376PX;
      .title-box {
        color: #D12734;
        font-weight: 500;
        font-size: 23PX;
        text-align: center;
      }

      .input-box {
        margin: 20PX auto 0;
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

        .company-scroll {
          position: absolute;
          top: 44PX;
          z-index: 102;
          width: 336PX;
          border-radius: 4PX;
          background-color: #F9F9F9;
          padding: 10PX;
          box-sizing: border-box;

          div {
            color: #878787;
            font-weight: 400;
            font-size: 16PX;
            line-height: 28PX;
            cursor: pointer;
          }
        }
      }

      .red-button {
        width: 336PX;
        height: 46PX;
        top: 815PX;
        left: 2740PX;
        border-radius: 6PX;
        background-color: #D12734;
        color: #FFFFFF;
        font-weight: 400;
        font-size: 18PX;
        text-align: center;
        cursor: pointer;
        line-height: 46PX;
        margin: 20PX auto;
        border: none;
      }

      .bottom-tips {
        color: #D12734;
        font-size: 14PX;
        text-align: center;
        opacity: 0.6;
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

    .red-button {
      width: 336PX;
      height: 46PX;
      top: 815PX;
      left: 2740PX;
      border-radius: 6PX;
      background-color: #D12734;
      color: #FFFFFF;
      font-weight: 400;
      font-size: 18PX;
      text-align: center;
      cursor: pointer;
      line-height: 46PX;
      margin: 90PX auto 20px;
    }

    .bottom-tips {
      color: #D12734;
      font-size: 14PX;
      text-align: center;
      opacity: 0.6;
    }
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10PX;
  min-width: 376PX;
  height: 91PX;
  border-radius: 10PX 10PX 0 0;
  background-color: #D12734;
  box-sizing: border-box;

  .title {
    width: 100%;
    color: #FFF9D7;
    font-size: 16PX;
    text-align: center;

    .line1 {
      font-size: 26PX;
      margin: 0 0 6PX;
    }
  }

  .modal-close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 20PX;
    padding: 0;
    color: #ffffff;
    opacity: 0.54;
    position: absolute;
    top: 6PX;
    right: 4PX;
    width: 30PX;
    height: 30PX;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}


</style>