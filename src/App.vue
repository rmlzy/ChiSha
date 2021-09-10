<template>
  <div class="container">
    <a
      class="github-fork-ribbon"
      target="_blank"
      href="https://github.com/rmlzy/ChiSha"
      data-ribbon="Star me on GitHub"
      title="Star me on GitHub"
    >
      Star me on GitHub
    </a>

    <div class="chooser">
      <div class="banner">
        <div class="banner__title">今天{{ date }}吃啥</div>
        <div class="banner__loading">
          <span v-if="result">{{ result }}</span>
          <loading v-else-if="running" :running="running"></loading>
          <img v-else src="./assets/status=1.png" />
        </div>
      </div>

      <div class="roulette__wrap">
        <img src="./assets/start.png" class="roulette__start" @click="start" />
        <div class="roulette" ref="rouletteRef">
          <div class="roulette__item" v-for="(item, idx) in menus" :key="idx">
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <div class="copyright">
      <p>
        <a href="javascript:;" @click="showCustomDialog">自定义菜单</a>
      </p>
      <p>
        <span>设计稿来自&nbsp;</span>
        <a
          href="https://www.figma.com/community/file/1018001235799678662"
          target="_blank"
          >@xincreate</a
        >
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import 'github-fork-ribbon-css/gh-fork-ribbon.css';
import 'normalize.css/normalize.css';
import Loading from './components/loading.vue';
import { getMenus, getDate, getDeg, prefixStyle, calcResult } from './lib/util';

export default defineComponent({
  name: 'ChiSha',
  components: { Loading },
  setup() {
    const rouletteRef = ref(null);
    const state = reactive({
      date: getDate(),
      menus: getMenus(),
      running: false,
      result: '',
    });

    const transformJs = prefixStyle('transform-js');

    let interval;

    const run = () => {
      state.result = '';
      state.running = true;
      const transformDeg = rouletteRef.value.style[transformJs];
      let deg = getDeg(transformDeg);
      interval = setInterval(() => {
        deg += 2;
        deg = deg % 360;
        rouletteRef.value.style[transformJs] = `rotate(${deg}deg)`;
      }, 1);

      setTimeout(() => {
        stop();
      }, 5000);
    };

    const stop = () => {
      state.running = false;
      const transformDeg = rouletteRef.value.style[transformJs];
      const deg = getDeg(transformDeg);
      state.result = calcResult(state.menus, deg);
      clearInterval(interval);
    };

    const start = () => {
      if (state.running) {
        stop();
      } else {
        run();
      }
    };

    const showCustomDialog = () => {
      window.alert('功能开发中 :)');
    };

    return {
      rouletteRef,
      ...toRefs(state),
      start,
      showCustomDialog,
    };
  },
});
</script>

<style lang="less">
@import './assets/style';
</style>
