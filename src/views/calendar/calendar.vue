<template>
  <div>
    <Calendar />
    <Popup />
    <!-- <div class="flownav" @touchmove="move" ref="yuan"></div> -->
  </div>
</template>




<script lang="ts">
import { ref } from 'vue'
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'

export default {
  //   setup() {
  //     const yuan = ref(null)
  //     const move = (e: any) => {
  //       console.log(yuan)

  //       //   e.target.style.width = e.target.offsetLeft
  //       //   e.target.style.height = e.target.offsetHeight
  //       console.log(e)
  //     }
  //     return { move, yuan }
  //   },
  components: {
    Calendar,
    Popup
  }
}
</script>

<style scoped lang='less'>
.flownav {
  width: 80px;
  height: 80px;
  border: 1px solid red;
  border-radius: 50%;
  background-color: violet;
  z-index: 3000;
  position: fixed;
  top: 0;
  right: 0;
}
</style>