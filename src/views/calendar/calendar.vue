<template>
  <div>
    <Calendar />
    <Popup />
  </div>
</template>




<script lang="ts">
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'

export default {
  components: {
    Calendar,
    Popup
  }
}
</script>

<style scoped lang='less'>
</style>