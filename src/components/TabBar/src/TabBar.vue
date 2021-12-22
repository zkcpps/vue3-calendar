<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import active_calendar from '@/assets/images/active_calendar.png'
import inactive_calendar from '@/assets/images/inactive_calendar.png'
import active_bussiness from '@/assets/images/active_bussiness.png'
import inactive_bussiness from '@/assets/images/inactive_bussiness.png'
import active_customer from '@/assets/images/active_customer.png'
import inactive_customer from '@/assets/images/inactive_customer.png'
import active_worker from '@/assets/images/active_worker.png'
import inactive_worker from '@/assets/images/inactive_worker.png'
const router = useRouter()
let active = ref(0)
const onChange = (index) => {
  active.value = index
  if (index === 0) {
    router.push('/calendar')
  } else if (index === 1) {
    router.push('/customer-list')
  } else if (index === 2) {
    router.push('/business-score')
  } else if (index === 3) {
    router.push('/worker')
  }
}
const icon = {
  active_calendar,
  inactive_calendar,
  active_bussiness,
  inactive_bussiness,
  active_customer,
  inactive_customer,
  active_worker,
  inactive_worker
}
</script>

<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item>
      <span>工作日历</span>
      <template #icon="props">
        <img
          :src="props.active ? icon.active_calendar : icon.inactive_calendar"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>客户列表</span>
      <template #icon="props">
        <img
          :src="props.active ? icon.active_customer : icon.inactive_customer"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>业务评分</span>
      <template #icon="props">
        <img
          :src="props.active ? icon.active_bussiness : icon.inactive_bussiness"
        />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <span>工作台</span>
      <template #icon="props">
        <img :src="props.active ? icon.active_worker : icon.inactive_worker" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style></style>
