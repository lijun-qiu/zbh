
<template>
  <div>
    <a-style-provider hash-priority="high" :transformers="[legacyLogicalPropertiesTransformer]">
      <NuxtPage />
    </a-style-provider>
  </div>
</template>

<script lang="ts" setup>
import { legacyLogicalPropertiesTransformer } from 'ant-design-vue';

</script>

<style lang='scss'>
html,body{
  margin: 0;
  padding: 0;
  font-family:  "Microsoft YaHei", "微软雅黑", Arial, Helvetica, sans-serif;
}
html{
  font-size: 12vh;
}
body {
  font-size: 16PX;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
body::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
body .ant-message {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14PX;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: -apple-system,BlinkMacSystemFont,
  'Segoe UI',
  Roboto,'Helvetica Neue',
  Arial,'Noto Sans',sans-serif,
  'Apple Color Emoji','Segoe UI Emoji',
  'Segoe UI Symbol','Noto Color Emoji';
  position: fixed;
  top: 8PX;
  width: 100%;
  pointer-events: none;
  z-index: 1010;
  .ant-message-notice{
    padding: 8PX;
    text-align: center;
    box-sizing: border-box;
    .ant-message-notice-content{
      display: inline-block;
      padding: 9PX 12PX;
      background: #ffffff;
      border-radius: 8PX;
      box-shadow: 0 6PX 16PX 0 rgba(0, 0, 0, 0.08),
      0 3PX 6PX -4PX rgba(0, 0, 0, 0.12),
      0 9PX 28PX 8PX rgba(0, 0, 0, 0.05);
      pointer-events: all;
      box-sizing: border-box;
      font-family: -apple-system,BlinkMacSystemFont,
      'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',
      sans-serif,'Apple Color Emoji','Segoe UI Emoji',
      'Segoe UI Symbol','Noto Color Emoji';
      font-size: 14PX;
      .anticon{
        vertical-align: text-bottom;
        margin-inline-end: 8PX;
        font-size: 16PX;
      }
    }
    .ant-message-info{
      .anticon{
        color: #1677ff;
      }
    }
    .ant-message-success{
      .anticon{
        color: #52c41a;
      }
    }
    .ant-message-error{
      .anticon{
        color: #ff4d4f;
      }
    }
    .ant-message-warning{
      .anticon{
        color: #faad14;
      }
    }
  }
}
</style>