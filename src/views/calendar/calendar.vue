<template>
  <div><Calendar :type="type" @changeType="changeType" /></div>
</template>

<script lang="ts" setup>
import Calendar from '../../components/Calendar'
import { ref } from 'vue'
const type = ref('month')
const changeType = () => {
  type.value = type.value === 'week' ? 'month' : 'week'
}
</script>

<style scoped></style>
