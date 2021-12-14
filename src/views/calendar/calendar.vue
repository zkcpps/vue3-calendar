<template>
  <div>
    <Calendar :date="currentDate" @changeCurrentDate="changeCurrentDate" />
    <HoverButton />
    <CalendarList
      :style="{ overflowY: 'scroll', height: '500px' }"
      @touchstart="touchstart"
      @touchend="touchend"
    ></CalendarList>
  </div>
</template>

<script lang="ts">
import { provide, ref } from 'vue'
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
    let touchstarts = ref()
    const changeCurrentDate = (dateString) => {
      currentDate.value = new Date(dayjs(dateString).valueOf())
    }
    const touchstart = (e: any) => {
      touchstarts.value = e.changedTouches[0].clientX
    }
    const touchend = (e: any) => {
      let touchLenght = touchstarts.value - e.changedTouches[0].clientX
      if (touchLenght > 10) {
        currentDate.value = new Date(
          dayjs(currentDate.value).add(1, 'day').valueOf()
        )
        console.log('向右')
      } else if (touchLenght < -10) {
        currentDate.value = new Date(
          dayjs(currentDate.value).add(-1, 'day').valueOf()
        )

        console.log('向左')
      }
    }

    return {
      currentDate,
      changeCurrentDate,
      touchstart,
      touchend
    }
  }
}
</script>

<style scoped></style>
