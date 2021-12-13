<template>
  <div>
    <Calendar :date="currentDate" @changeCurrentDate="changeCurrentDate" />
    <HoverButton />
    <CalendarList></CalendarList>
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
