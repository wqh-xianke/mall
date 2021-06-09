<template>
  <div class="detail-common-info">
    <!-- 判断是否存在 -->
    <div v-if="Object.keys(commonInfo).length !== 0" class="common-info">
      <!-- 这里是头部 -->
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="header-right"></i>
        </div>
      </div>
      <!-- 这里是用户名区 -->
      <div class="info-user">
        <img :src="commonInfo.user.avatar" alt="" />
        <span>{{ commonInfo.user.uname }}</span>
      </div>
      <!-- 这里是评论的信息 -->
      <div class="info-detail">
        <p>{{ commonInfo.content }}</p>
        <div class="info-other">
          <span class="data">{{ commonInfo.created | showDate }}</span>
          <span>{{ commonInfo.style }}</span>
        </div>
        <div class="info-img">
          <img
            :src="item"
            alt=""
            v-for="(item, index) in commonInfo.images"
            :key="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/untils.js'
export default {
  name: "DetailCommonInfo",
  props: {
    commonInfo: {
      type: Array,
    },
  },
  filters:{
    showDate(value){
      // 1 将时间戳转化成data对象
      const date = new Date(value*1000)
      // 2 将data进行格式化
      return formatDate(date,'yyyy-MM-dd')
    }
  }
   
};
</script>

<style scoped>
.common-info {
  position: relative;
  padding: 0 8px;
  font-size: 14px;
  border-bottom: 4px solid #ececec;
}
.info-header {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #ccc;
}
.header-more {
  position: absolute;
  right: 10px;
  top: 0;
}
.info-user img{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: middle;
}
.info-img img {
  width: 60px;
  height: 60px;
}
</style>
