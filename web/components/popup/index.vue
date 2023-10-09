<!-- 
  
  默认有遮罩层和点击遮罩层关闭 需要加bgClosePopup函数,子组件不能修改父组件属性
       <prop :isShow="isShow" @bgClosePopup="closePopup">
        内容
      </prop>
 -->
 <template>
  <div class="main" v-if="isShow">
    <div class="bg" v-if="isBg" @click="closePopup"></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  isShow: {//展示
    type: Boolean,
    default: false, 
  },
  closeOnClickOverlay: {//点击遮罩层是否关闭
    type: Boolean,
    default: true, 
  },
  isBg: {//是否需要遮罩层
    type: Boolean,
    default: true, 
  },
})

const isShow = ref(props.isShow)

watch(
  () => props.isShow, (newValue) => {
    if(newValue){
      isShow.value = true
      document.body.style.overflow = 'hidden';
    }else{
      isShow.value = false
      document.body.style.overflow = '';
    }
  }
)


const emit = defineEmits(['bgClosePopup'])

const closePopup = ()=>{
  if(props.closeOnClickOverlay){
    isShow.value = false
    emit('bgClosePopup',false)
  }
}

onMounted(() => {})

</script>

<style lang="scss" scoped>

.main{
  .bg {
    width: 100%;
    height: 100%;
    background: rgba(83, 90, 101, 0.7);
    position:fixed;
    left: 0;
    top: 0;
    z-index: 1000;
  }

  .content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 1001;
    padding: 40px;
    border-radius: 20px;
  }
}

</style>