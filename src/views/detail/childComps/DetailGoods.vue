<template>
<!-- <div class="detail-goods"> -->
 <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>

    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>

    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>

  <div class="info-service">
    <span class="info-service-item" v-for="(item,index) in goods.services.length-1" :key="index">
      <img :src="goods.services[index].icon" alt="">
      <span>{{goods.services[index].name}}</span>
    </span>
  </div>
  </div>
<!-- </div> -->
</template>

<script>
export default {
  name:"DetailGoods",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },

}
</script>

<style>
.info-title{
  color: black;
  font-size: 18px;
  font-weight: bold;
}
.n-price{
  color: rgb(190, 30, 54);
  font-size: 25px;
}
.o-price{
  font-size: 12px;
  text-decoration:line-through;
  font-weight: bold;
}
.discount{
  background-color: #ff6876;
  display: inline-block;
  height: 20px;
  color: white;
  border-radius: 8px;
}
.info-other{
  display: flex;
  margin-top: 20px;
   justify-content: space-between;
   border-bottom:1px solid #ccc ;
}
.info-service {
  
   display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
   justify-content: space-around;
   border-bottom:1px solid #ccc;
   font-size: 14px;
   font-weight: bold;
   
}
.info-service img {
  height: 15px;
  vertical-align: middle;
}

</style>