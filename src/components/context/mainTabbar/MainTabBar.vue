<template>
<div id="main-tab-bar">
<tab-bar>
    <tab-bar-item path="/home">
    <!-- 新的v-slot插槽的用法 加在template中， -->
    <template v-slot:item-icon>
   <img src="~assets/img/tabbar/home.svg" alt="">
    </template>
     <template v-slot:item-icon-active>
   <img src="~assets/img/tabbar/home_active.svg" alt="">
    </template>
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
    <template v-slot:item-icon>
   <img  src="~assets/img/tabbar/category.svg" alt="">
    </template>
     <template v-slot:item-icon-active>
   <img src="~assets/img/tabbar/category_active.svg" alt="">
    </template>
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
    <template v-slot:item-icon>
   <img  src="~assets/img/tabbar/shopcart.svg" alt="">
    </template>
     <template v-slot:item-icon-active>
   <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
    </template>
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
    <template v-slot:item-icon>
   <img  src="~assets/img/tabbar/profile.svg" alt="">
    </template>
     <template v-slot:item-icon-active>
   <img  src="~assets/img/tabbar/profile_active.svg" alt="">
    </template>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</div>
  
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

 .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
