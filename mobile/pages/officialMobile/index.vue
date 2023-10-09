
<!--
  Version: 官网首页移动端
  Author: hhd
  Created: 2023/07/23
  Description:
-->
<template>
  <div>
    <h1>官网首页</h1>
    <van-button type="primary" @click="showToast('toast')">button</van-button>
    <VanButton type="success" @click="showNotify('notify')">button</VanButton>
    <LazyVanButton type="default">lazy button</LazyVanButton>

    <div class="card-box">

       Here plugin state: {{ store.id }}
      <span>1928u921821</span>12

    </div>
  </div>
</template>

<script setup lang="ts">
  const handleMessage  = () => {
    message.info("This is a normal message");
  }

  import { useStore } from "~/store/index";
  const store = useStore()
  console.log(store.setId('222222'))



</script>

<style scoped lang="scss">
.card-box{
  font-size: 40px; line-height: 60px;
  border: 1px solid black;
  width: 1080px;
  height: 200px;
  box-sizing: border-box;
  span{
    color: red;
  }
}
</style>