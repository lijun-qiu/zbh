
import { ref } from 'vue';


/**
 * Version: pa打点 hook 封装
 * Author: hhd
 * Created: 2023/08/03
 * @return {{firePingansec: ((function(*): Promise<void>)|*)}}
 * @description:
 *  import usePingansec from '~/hooks/usePingansec'
 *  const { firePingansec } = usePingansec();
 *  firePingansec(5342)
 */

export default function usePingansec() {
  const pingansec = ref(null);

  const loadPingansec = async () => {
    if (!pingansec.value) {
      pingansec.value = await import('pingansec-vue-ana');
    }
  };

  const firePingansec = async (code) => {
    await loadPingansec();
    pingansec.value.default.fire(code);
  };

  return {
    firePingansec,
  };
}