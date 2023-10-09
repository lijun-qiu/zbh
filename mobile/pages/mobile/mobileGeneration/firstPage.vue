<template>
  <div class="imgcontent">
    <img v-if="browser==='360浏览器'" src="~public/mobileGeneration/360pic01.png" alt="">
    <img v-if="browser==='头条'" src="~public/mobileGeneration/toutiaopic01.png" alt="">
    <img v-if="browser==='夸克'" src="~public/mobileGeneration/quarkpic01.png" alt="">
    <img v-if="browser==='UC浏览器'" src="~public/mobileGeneration/ucpic01.png" alt="">
    <img v-if="browser==='悟空搜索'" src="~public/mobileGeneration/wukongpic01.png" alt="">
  </div>
</template>



<script>

export default {
  props: {
    browser: {
      type: String,
      required: true,
    },
  },
  components:{},
  setup(props) {
  }
}
</script>

<style scoped lang="scss">
.imgcontent{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>