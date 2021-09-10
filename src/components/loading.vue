<template>
  <div class="loading">
    <img :src="statusImgs[status - 1]" alt="" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue';
import status1 from '../assets/status=1.png';
import status2 from '../assets/status=2.png';
import status3 from '../assets/status=3.png';
import status4 from '../assets/status=4.png';
import status5 from '../assets/status=5.png';
import status6 from '../assets/status=6.png';
import status7 from '../assets/status=7.png';
import status8 from '../assets/status=8.png';
import status9 from '../assets/status=9.png';
import status10 from '../assets/status=10.png';

const statusImgs = [
  status1,
  status2,
  status3,
  status4,
  status5,
  status6,
  status7,
  status8,
  status9,
  status10,
];

export default defineComponent({
  name: 'Loading',
  props: {
    running: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const state = reactive({
      status: 2,
      statusImgs,
    });

    let interval;
    const start = () => {
      if (interval) return;
      interval = setInterval(() => {
        if (state.status === 10) {
          state.status = 1;
        } else {
          state.status += 1;
        }
      }, 300);
    };

    const stop = () => {
      console.log('stop');
      clearInterval(interval);
    };

    watch(
      () => props.running,
      () => {
        console.log('??');
        if (props.running) {
          start();
        } else {
          stop();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
.loading {
  img {
    height: 24px;
  }
}
</style>
