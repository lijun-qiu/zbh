<template>
  <div>
    <div v-if="unfoldShow" class="unfold" @click="showAll">
      <img src="/companyMobile/common/unfold.png" alt="">
      <div class="bottom"></div>
    </div>
    <div v-if="!unfoldShow" class="unfold2" @click="closeAll">
    <img src="/companyMobile/common/unfold2.png" alt="">
    </div>
  </div>
</template>

<script setup>

const emit = defineEmits(['showAll','closeAll'])
let unfoldShow = ref(true)
const showAll = ()=>{
  unfoldShow.value = false
  emit('showAll')
}
const closeAll = ()=>{
  unfoldShow.value = true
  emit('closeAll')
}
</script>

<style lang="scss">
  .unfold{
    position: absolute;
    bottom: 0px;
    img{
      width: 1080px;
      height: 188px;
    }
  }
  .unfold2{
    img{
      width: 1080px;
      height: 140px;
    }
  }

  .bottom{
    background-color: #fff;
    width: 100%;
    height: 30px;
    margin-top: -20px;
  }

</style>