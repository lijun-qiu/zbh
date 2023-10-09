
<!--
  Version: 官网首页pc
  Author: hhd
  Created: 2023/07/23
  Description:
-->
<template>
  <div class="page" ref="container">
    <div class="fullscreen-layout">
      <Header @tabClick="(index)=>tabClick(index)"></Header>

      <div id="fullpage">
        <div class="section">
          <HomePage1 @openFormPop="(code)=>openFormPop(code)"/>
        </div>
        <div class="section">
          <HomePage2 @openFormPop="(code)=>openFormPop(code)"/>
        </div>
        <div class="section">
          <HomePage3 @openFormPop="(code)=>openFormPop(code)"/>
        </div>
        <div class='section'>
          <HomePage4 @tabClick="(index)=>tabClick(index)"
                     @openFormPop="(code)=>openFormPop(code)"/>
        </div>
      </div>

      <!-- 客服底部弹窗 -->
      <CustomerBottomPop :pageFlag="pageFlagValue"/>
      <!-- 表单提交弹窗 -->
      <Modal :visible="showModal"
             @update:visible="(value)=>showModal = value"/>

    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch, onBeforeUnmount } from "vue"
  import Modal from './components/Modal'
  import CustomerBottomPop from './components/CustomerBottomPop'
  import HomePage4 from './components/HomePage4'
  import HomePage3 from './components/HomePage3'
  import HomePage2 from './components/HomePage2'
  import HomePage1 from './components/HomePage1'
  import Header from './components/Header'
  import { useStore } from "~/store/index"
  import usePingansec from '~/hooks/usePingansec'


  const route = useRoute()
  const { source } = route.query
  const store = useStore()
  source && store.setSource(source)
  const { firePingansec } = usePingansec();


  const myFullpage = ref(null) // fullpage实例
  const showModal = ref(false) // 是否展示表单弹窗
  const pageFlag = ref('1')  // 当前展示页面类型
  const pageFlagValue = computed(() => { // 页面类型版本处理
    return (pageFlag.value === '1' && store.source === '4') ? '1-1' : pageFlag.value
  });


  /**
   * tab点击
   * @param index
   */
  const tabClick = (index) => {
    pageFlag.value = index
    myFullpage.value.moveTo(+index)
  }


  /**
   * 打开表单提交弹窗
   * @param code
   */
  const openFormPop = (code) => {
    showModal.value = true;
    firePingansec(code);
    if(store.source === '4'){
      firePingansec(5342) // 水滴pc广告B打开信息提交弹窗
    }else{
      firePingansec(5336)
    }
  }


  /**
   * 初始化fullpage
   */
  const initFullpage = () => {
    myFullpage.value = new fullpage('#fullpage', {
      verticalCentered: false, // 是否垂直居中
      scrollingSpeed: 1000, // 设置为想要的滚动时间（毫秒）
      anchors:['firstPage', 'secondPage', 'thirdPage','fourthPage'], // 页面锚点
      paddingTop: '12vh', // 距离顶部距离
      menu: '#header', // 菜单栏
      afterLoad: function(origin,indexObj) {
        const {index} = indexObj ?? {}
        pageFlag.value = index + 1 + ''
      }
    });
  }


  onMounted(() => {
    initFullpage()
    if(store.source === '4'){
      showModal.value = true;
      firePingansec(5344) // 水滴广告B版本访问
    }else if(store.source === '2'){
      firePingansec(5350) // 水滴广告A版本访问
    }else{
      firePingansec(5326)
    }
  })


  /**
   * 监听当前展示页面类型统计打点
   */
  watch(pageFlag, (newValue) => {
    const map = new Map([
      ['1', 5326],
      ['2', 5327],
      ['3', 5328],
      ['4', 5329],
    ])
    firePingansec(map.get(newValue))
  },{immediate: false});


  onBeforeUnmount(() => {
    myFullpage.value.destroy()
    myFullpage.value = null
  })

</script>

<style scoped lang="scss">
.page{
  .fullscreen-layout {
    background-color: #D12734;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>