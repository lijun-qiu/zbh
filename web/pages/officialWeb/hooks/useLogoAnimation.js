
import { ref, onUnmounted, onMounted } from 'vue';


/**
 * Version: logo组动画
 * Author: hhd
 * Created: 2023/08/03
 * @return {{firePingansec: ((function(*): Promise<void>)|*)}}
 * @description:
 *  import useLogoAnimation from './hooks/useLogoAnimation'
 *  const { startAnimationLogo, currentIcon } = useLogoAnimation();
 *  startAnimationLogo(0, 12000)
 */

export default function useLogoAnimation() {
  const icons = ['1', '2', '3', '4', '5'] // logo 数组集合
  const currentIndex = ref(0); // 当前展示logo index值
  let intervalId = null; // logo动画定时器
  const currentIcon = computed(() => { // 当前展示logo 对应数组值
    return icons[currentIndex.value];
  });


  /**
   * 开始tab动画
   */
  const startAnimationLogo = (index = 0, time= 2000) => {
    currentIndex.value = index
    intervalId && clearInterval(intervalId);
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % icons.length;
    }, time);
  }


  onUnmounted(() => {
    intervalId && clearInterval(intervalId);
  });

  return {
    startAnimationLogo,
    currentIcon,
  };
}