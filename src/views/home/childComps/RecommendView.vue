<template>
  <div id="recommend-view">
    <div v-for="(item,index) in recommends" :key="index" id="recommend-item">
     <a :href="item.link">
       <img :src="item.image" alt="">
       <div>{{item.title}}</div>
     </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"RecommendView",
  props:{
    recommends:{
      type:Array,
      defult() {
        return []
      }
    }
  }
}
</script>

<style>
#recommend-view{
  display: flex;
   text-align: center;
   width: 100%;
   height: 120px;
   box-shadow: 0 10px 0 rgba(100, 100, 100, 0.1);
   margin-top: 10px;
  
}
#recommend-item{
  flex: 1;
 
}
#recommend-view img{
  width: 65px;
  height: 65px;
}
</style>