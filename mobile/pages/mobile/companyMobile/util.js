import DOMPurify from 'dompurify';


export const blockRolling = () => {
  
  // 禁用双指放大
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
  }, {
    passive: false
  });

  // 禁用双击放大
  var lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
  }, {
    passive: false
  });

  document.documentElement.addEventListener("gesturestart", function(event) {
       event.preventDefault();
   });
}

import { computed } from 'vue';

//处理段落格式
export const dealBr = computed(()=>{
  return (str)=>{
    // 过滤危险字符
    str = DOMPurify.sanitize(str);
    // 替换/n为<br/>
    return str.replace(/\n/g, '<br/>');
  }
})

//处理段落格式
export const cahngeSize = computed(()=>{
  return (originalUrl, targetWidth, targetHeight)=>{
  // 将原始链接中的尺寸参数替换为目标尺寸
  const modifiedUrl = originalUrl.replace(/\/\d+x\d+\.(jpg|png)/i, '/' + targetWidth + 'x' + targetHeight + '.$1');
  
  return modifiedUrl;
  }
})
