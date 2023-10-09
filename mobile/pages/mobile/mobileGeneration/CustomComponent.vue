<template>
  <div>
    <div v-if="value=='page1'">
      <firstPage :browser="browser"></firstPage>
    </div>
    <div v-if="value=='page2'">
      <secondPage v-if="info2?.companyInfo" :browser="browser" :companyInfo="info2.companyInfo"></secondPage>
    </div>
    <div v-if="value=='page3'">
      <Company :browser="browser" :info2="info2" :payStates="payStates"></Company>
    </div>
    <div v-if="value=='page4'">
      <fourthPage></fourthPage>
    </div>
  </div>
</template>



<script>
import Company from './threePage/index.vue'
import firstPage from './firstPage.vue'
import secondPage from './secondPage.vue'
import fourthPage from './fourthPage.vue'
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    info2: {
      type: Object,
      required: true,
    },
    payStates:{
      type: Number,
      required: true,
    }
  },
  components:{Company,firstPage,secondPage,fourthPage},
  setup(props) {
  }
}
</script>

<style scoped lang="scss">
</style>