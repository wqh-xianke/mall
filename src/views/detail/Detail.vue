<template>
  <div id="detail">
    <detail-nav-bar @navClick="navClick"></detail-nav-bar>
    <scroll
      class="content"
      :pull-up-load="true"
      :probe-type="3"
      ref="scroll"
      @scroll="detailScroll"
    >
      <template v-slot:scroll>
        <!-- :top-images="topImages" 就是把父组件中的topImages 传递给子组件 -->
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-goods :goods="goods"></detail-goods>
        <detail-shop :shopInfo="shop"></detail-shop>
        <detail-goods-info
          :goodsInfo="detailInfo"
          ref="goods"
        ></detail-goods-info>
        <detail-common-info
          :commonInfo="commonInfo"
          ref="common"
        ></detail-common-info>
        <good-list :goods="recommend" ref="list"></good-list>
        <back-top class="back-top" @click="topClick" v-show="isShow"></back-top>
      </template>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import { getDetail, Goods, Shop, getRecommend } from "network/detail.js";
import DetailSwiper from "./childComps/DetailSwiper";
import detailGoods from "./childComps/DetailGoods";
import DetailShop from "./childComps/DetailShop";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

import Scroll from "components/common/scroll/Scroll";
import DetailCommonInfo from "./childComps/DetailCommonInfo.vue";
import GoodList from "components/context/goodlist/GoodList.vue";
import BackTop from "components/context/backtop/BackTop.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    getDetail,
    DetailSwiper,
    Goods,
    detailGoods,
    Shop,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailCommonInfo,
    getRecommend,
    GoodList,
    BackTop,
  },
  data() {
    return {
      DetailCommonInfo,
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      commonInfo: {},
      recommend: {},
      isShow: false,
      themeY: [],
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    // 获取详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      // 获取商品的信息 （Goods G 为什么是大写？）
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商家信息
      this.shop = new Shop(data.shopInfo);
      // 直接获取商品的详情数据
      this.detailInfo = data.detailInfo;
      // 取出评论信息
      if (data.rate.cRte !== 0) {
        this.commonInfo = data.rate.list[0];
      }
    });
    //  获取推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });
  },
  updated() {
    this.themeY = [];
    this.themeY.push(0);
    this.themeY.push(this.$refs.goods.$el.offsetTop);
    this.themeY.push(this.$refs.common.$el.offsetTop);
    this.themeY.push(this.$refs.list.$el.offsetTop);
  },
  methods: {
    topClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    detailScroll(position) {
      this.isShow = (-position.y) > 1000;
    },
  },
  navClick(index) {
    // console.log(index);
    this.$refs.scroll.scrollTo(0, -this.themeY[index], 100);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  background-color: #fff;
  z-index: 10;
  /* 这里就等于wapper的高度 */
  height: 100vh;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 1px;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #fff;
}

</style>