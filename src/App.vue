<template>
  <div id="nav">
   <router-view v-slot="{ Component }">
      <!-- exclude="Detail" 需要每次重新创建详情页来请求不同的数据
      就是detail排除在keep-alive外
       -->
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- main-tab-bar 是在哪里的模板？ -->
    <main-tab-bar></main-tab-bar>
    
  </div>
</template>
  <script>
import MainTabBar from "components/context/mainTabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>
<style>
@import "assets/css/base.css";
</style>
