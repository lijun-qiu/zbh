<template>
  <div>
      <popup v-for="(item,index) in advertisementImg" :key="index" :isShow="item.isShow" :closeOnClickOverlay="false">
        <div class="advertisement">
          <div v-if="closeShow" class="close" @click="closeAdvertisement(item)"><img src="~public/companyMobile/common/close.png" alt=""></div>
          <div class="companylog">{{ companyLog }}</div>
            <div v-if="!closeShow" class="backgroundself">{{countdown}} 企业自述</div>
            <div class="showAdvertisement_dsc">
             <img :src="`${cdnURL + item.contenImg}`" alt="">
            </div>
            <div class="showAdvertisement_btn"><span @click="knowMore(item)"><img :src="`${cdnURL+item.button1}`" alt=""></span><span @click="contact"><img :src="`${cdnURL + item.button2}`" alt=""></span></div>
        </div>
      </popup>
  </div>
</template>

<script setup>

const props = defineProps(['type','advertisementImgs','companyLog'])

const {advertisementImgs,companyLog} = props || {}

const config = useRuntimeConfig()

let cdnURL = config.public.cdnURL

cdnURL += '/shuidi/images/companyMobile2'

let advertisementImg = reactive(advertisementImgs)


watch(()=>props.type,(newVal)=>{
  if(newVal==='1'){
    countdown.value = ''
    advertisementImg[0].isShow = true
  }else if(newVal==='2'){
    countdown.value = ''
    advertisementImg[1].isShow = true
  }
})

//推荐业务
let countdown = ref(5) //倒计时
let randomAdv //随机数
let closeShow = ref(false)

const startAnimation = ()=>{
  if(countdown.value>0){
    setTimeout(() => {
      countdown.value--
      startAnimation()
    }, 1000);
  }else{
    randomAdv.isShow = false
    countdown.value = ''
    closeShow.value = true
  }
}
 //开启动画
 const startAnimat = ()=>{
  // 随机选择其中一个
  const random =  Math.random()
 
  if(advertisementImg.length>1){
    randomAdv = random < 0.5 ? advertisementImg[0]  : advertisementImg[1] 
  }else{
    randomAdv = advertisementImg[0]
  }
 

  //等待图片加载完再弹出
  const loadImage = (arr) => {
    let newarr = []
    for(let i=0;i<arr.length;i++){
      let p = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = cdnURL + arr[i].contenImg;
      });
      newarr.push(p)
    }
    return newarr
  };

  Promise.all(loadImage(advertisementImg))
    .then((images) => {
      // 两张图片都加载完成
      randomAdv.isShow = true;
      // 开始广告
      startAnimation();
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });
}


const emit = defineEmits(['restart','callPhone'])

//了解更多
const knowMore = (item)=>{
  item.isShow = false
  countdown.value = ''
  emit('restart')
}
//立即联系
const contact = (item)=>{
  item.isShow = false
  countdown.value = ''
  emit('restart')
  emit('callPhone')
}

//广告关闭按钮
const closeAdvertisement = (item)=>{
  item.isShow = false

  emit('restart')
}

onMounted(() => {
  startAnimat()
})
</script>

<style lang="scss" scoped>
 .advertisement{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 20;
      .close{
        position: absolute;
        right: 15px;
        top: 10px;
        width: 92px;
        height: 68px;
        border-radius: 0px 20px 0px 20px;
        background-color: rgba(0,0,0,0.3);
        text-align: center;
        line-height: 68px;
        img{
          width: 30px;
          height: 30px;
        }
      }
      .companylog{
        position: absolute;
        left: 44px;
        top: 28px;
        color: #FFFFFF;
        font-size: 36px;
      }
        .backgroundself{
          width: 210px;
          height: 68px;
          border-radius: 0px 20px 0px 20px;
          background: rgba(0,0,0,0.3);
          position: absolute;
          right: 15px;
          top: 10px;
          color: #EEEEEE;
          font-size: 32px;
          line-height: 68px;
          text-align: center;
        }
        .showAdvertisement_dsc{
          img{
            width: 1000px;
            height: 1260px;
          }

        }
 
        .showAdvertisement_btn{
          position: absolute;
          top: 1060px;
          width: 880px;
          margin: 0 60px;
          display: flex;
          justify-content: space-between;
          img{
            width: 420px;
            height: 120px;
          }
          span:active{
            opacity: 0.7;
          }
        }
      }
</style>