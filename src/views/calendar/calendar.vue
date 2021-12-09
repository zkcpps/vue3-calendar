<template>
  <div>
    <Calendar />
    <Popup />
    <HoverButton />
  </div>
</template>




<script lang="ts">
import { reactive, ref } from 'vue'
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'
import HoverButton from './components/HoverButton.vue'

export default {
  setup() {
    return {}
  },
  components: {
    Calendar,
    Popup,
    HoverButton
  }
}
</script>

<style scoped lang='less'>
</style>