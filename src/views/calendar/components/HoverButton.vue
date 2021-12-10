<!-- 悬浮按钮组件  -->
<template>
  <div
    class="flownav"
    @touchmove="move"
    :style="{ top: Top + 'px', left: Left + 'px' }"
  >
    周视图
  </div>
</template>

<script lang='ts'>
import { ref, reactive } from 'vue'

interface DataProps {}
export default {
  name: '',
  setup() {
    let Top = ref()
    let Left = ref()

    const move = (e: any) => {
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
<style lang='less' scoped>
.flownav {
  position: fixed;
  top: 200;
  right: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fcfcfc;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.4);
  color: rgba(22, 144, 255, 1);
  text-align: center;
  line-height: 80px;
  z-index: 3000;
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