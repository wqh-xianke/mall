<template>
  <div id="detailnavbar">
    <nav-bar>
      <template v-slot:left> 
        <div class="backimg" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in titles" 
          :key="index" class="titles"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)">
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0,
    };
  },
  methods: {
    titleClick(index){
        this.currentIndex = index
        this.$emit('navClick',index)
    },
    backClick(){
      // 返回的路由写法
      this.$router.back()
    },
  },
};
</script>

<style>
.title {
  display: flex;
}
.titles {
  flex: 1;
}
.active {
  color: pink;

}
.backimg {
  margin-top: 7px;
}
</style>