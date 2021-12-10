<template>
  <div>
    <Calendar :date="currentDate" @changeCurrentDate="changeCurrentDate" />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar'
import dayjs from 'dayjs'
import { ref } from 'vue'
export default {
  components: {
    Calendar
  },
  setup() {
    const currentDate = ref(new Date())
    const changeCurrentDate = (dateString) => {
      currentDate.value = new Date(dayjs(dateString).valueOf())
    }
    return {
      currentDate,
      changeCurrentDate
    }
  }
}
</script>

<style scoped></style>
