<template>
  <div class="good-list">
    <good-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    ></good-list-item>
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem.vue";

export default {
  name: "GoodList",
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>