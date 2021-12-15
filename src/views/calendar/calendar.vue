<template>
  <div>
    <Calendar
      :date="currentDate"
      @changeCurrentDate="changeCurrentDate"
      :userid="userId"
    />
    <HoverButton />
    <CalendarList
      :style="{ overflowY: 'scroll', height: '500px' }"
    ></CalendarList>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'
import HoverButton from './components/HoverButton.vue'
import CalendarList from './components/CalendarList.vue'
import dayjs from 'dayjs'
export default {
  components: {
    Calendar,
    Popup,
    HoverButton,
    CalendarList
  },
  setup() {
    const currentDate = ref(new Date())
    const userId = ref(sessionStorage.getItem('userId'))
    const changeCurrentDate = (dateString: string) => {
      currentDate.value = new Date(dayjs(dateString).valueOf())
    }
    return {
      currentDate,
      userId,
      changeCurrentDate
    }
  }
}
</script>

<style scoped></style>
