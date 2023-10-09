import { computed } from 'vue';
import DOMPurify from 'dompurify';

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