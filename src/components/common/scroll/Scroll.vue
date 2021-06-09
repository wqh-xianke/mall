<template>
  <div class="wrapper scroll" ref="wrapper">
    <div class="content">
      <slot name="scroll"></slot>
    </div>
  </div>
</template>

<script>
import BSscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建bsscroll 对象
    this.scroll = new BSscroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
    });
    // 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
      //
      this.scroll.refresh();
      this.scroll.finishPullUp();
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      // 这里调用的scrollto是betterscroll默认的方法
      this.scroll.scrollTo(x, y, time);
    },
  },
  // 定义可以连续加载的方法，以便于在加载第一次后可以再次加载
  finishPullUp() {
    this.scroll.finishPullUp();
  },
};
</script>

<style>
</style>