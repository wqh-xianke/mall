<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tab"
          v-show="isFixed"
        ></tab-control>
    <scroll
      class="contents"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <template v-slot:scroll>
        <home-swiper :banners="banners" 
         @SwiperImgLoad="SwiperImgLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl"
        ></tab-control>
        <good-list :goods="goods[currentType].list"></good-list>
      </template>
    </scroll>

    <back-top @click="topClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/tabcontrol/TabControl.vue";
import GoodList from "components/context/goodlist/GoodList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/context/backtop/BackTop.vue';

import { getHomeMultidata } from "network/home";
import { getHomeGoods } from "network/home";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isBackTopShow:false,
      TabControlOffTop:0,
      isFixed:false,
      saveY:0,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed:{
    activated() {
      this.$refs.scroll.scrollTo(0,saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    },
  },
  methods: {
    // 事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 为了两个tab-control 点击的index相同
      this.$refs.tab.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;

    },
    topClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){  //这里要传入参数position
      // 1(-position.y)>1000  直接判断，大于就是true,小于就是false
    this.isBackTopShow = (-position.y)>1000
    //  2 判断是否吸顶
  this.isFixed = (-position.y) > this.TabControlOffTop
    },
    loadMore(){
      // console.log("aaaa");
      this.getHomeGoods(this.currentType)
    },
    SwiperImgLoad(){
      this.TabControlOffTop=this.$refs.tabControl.$el.offsetTop 
    },

    // 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
         // 调用scroll里的再次上拉加载的方法
        this.$refs.scroll.finishPullUp()
      });
      
    },
  },
};
</script>
<style scoped>
.home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: #ff8e96;
  font-size: 20px;
  color: white;
  /* 设fixed 是对浏览器自带的滚动而存在的 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /* 吸顶效果  粘性定位 */
  /* position: fixed;
        top: 44px;
        left: 0;
        right: 0; */
  /* 在下面BScroll里 使用定位会导致突然脱离标准流 
 出现向上瞬间提的bug 而且并不能很好的展示吸顶效果*/

  position: relative;
  z-index: 9;
  padding-top: 10px;
}
.contents {
  /* 为什么这样就可以滑动 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
}
</style>
