<template>
  <div>
    <!-- <Calendar />
    <Popup />
    <HoverButton /> -->
    <CalendarList></CalendarList>
  </div>
</template>




<script lang="ts">
import { reactive, ref } from 'vue'
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'
import HoverButton from './components/HoverButton.vue'
import CalendarList from './components/CalendarList.vue'


export default {
  setup() {

    return {}
  },
  components: {
    Calendar,
    Popup,
    HoverButton,
    CalendarList
  }
}
</script>

<style scoped lang='less'>




</style>