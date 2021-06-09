<template>
  <swiper>
    <swiper-item
      v-for="(item, index) in banners"
      :key="index"
      class="home-swiper"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    // 不清楚什么意思
    banners: {
      default() {
        return [];
      },
    },
  },
  data(){
    return {
      isLoad:false
    }
  },
  methods: {
    imgLoad(){
      if(!this.isLoad){
       this.$emit('SwiperImgLoad')
       this.isLoad=true
      }
     
    }
  },
};
</script>

<style>
.home-swiper img {
  width: 100%;
}
</style>