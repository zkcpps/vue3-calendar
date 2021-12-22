<!-- 悬浮按钮组件  -->
<template>
  <div
    class="flownav"
    @touchmove="move"
    :style="{ top: Top + 'px', left: Left + 'px' }"
  >
    <img src="@/assets/images/week_show.png" />
  </div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import { preventDefault } from 'vant/lib/utils'

interface DataProps {}
export default {
  name: '',
  setup() {
    let Top = ref()
    let Left = ref()
    const move = (e: any) => {
      // 防止与touchstart冲突
      e.preventDefault()
      // 计算悬浮按钮在视图内的最大移动距离（横轴跟竖轴）
      const maxX = document.documentElement.clientWidth - e.target.offsetWidth
      const maxY = document.documentElement.clientHeight - e.target.offsetHeight
      //   计算悬浮按钮离 左侧跟顶部的距离
      Left.value = e.changedTouches[0].clientX - e.target.offsetWidth / 2
      Top.value = e.changedTouches[0].clientY - e.target.offsetHeight / 2
      // 使悬浮按钮始终只能在视图范围内移动
      if (Left.value < 0) {
        Left.value = 0
      } else if (Left.value > maxX) {
        Left.value = maxX
      }

      if (Top.value < 0) {
        Top.value = 0
      } else if (Top.value > maxY) {
        Top.value = maxY
      }
    }
    return { move, Top, Left }
  }
}
</script>
<style lang="less" scoped>
.flownav {
  position: fixed;
  top: 70vh;
  width: 50px;
  height: 50px;
  right: 0;
  z-index: 3000;
  img {
    width: 50px;
    height: 50px;
  }
}
// .activeRight {
//   width: 40px;
//   height: 80px;
//   border-radius: 40px 0 0 40px;
//   overflow: hidden;
// }

// .activeLeft {
//   width: 40px;
//   height: 80px;
//   border-radius: 0 40px 40px 0;
//   overflow: hidden;
// }
</style>
