<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
let active = ref(0);
const onChange = (index) => {
  active = index;

  if (index === 0) {
     router.push("/calendar");
  } else if(index === 1) {
    router.push("/customer-list");
  } else if (index === 2) {
    router.push("/business-score");
  } else if (index === 3) {
    router.push("/worker");
  }
  // switch (index) {
  //   case 0:
  //     router.push("/calendar");
  //   case 1:
  //     router.push("/customer-list");
  //   case 2:
  //     router.push("/business-score");
  //   case 3:
  //     router.push("/worker");
  //   default:
  //     router.push("/calendar");
  // }
};
</script>

<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o">工作日历</van-tabbar-item>
    <van-tabbar-item icon="envelop-o">客户列表</van-tabbar-item>
    <van-tabbar-item icon="location-o">业务评分</van-tabbar-item>
    <van-tabbar-item icon="user-o">工作台</van-tabbar-item>
  </van-tabbar>
</template>

<style></style>
