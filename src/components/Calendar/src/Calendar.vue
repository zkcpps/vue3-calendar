<template>
  <div class="calendar">
    <button @click="lastMonth">上一月</button>
    <button @click="nextMonth">下一月</button>
    <button @click="changeType">切换模式</button>
    <ul>
      <li
        class="header"
        v-for="(item, index) in Header"
        :key="`header-${index}`"
      >
        {{ item }}
      </li>
      <li
        class="header"
        v-for="(item, index) in dayRef.day"
        :key="`day-${index}`"
      >
        <span class="day">{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  fillMonthCalendarDatas,
  fillWeekCalendarDatas,
  fillCalendarDatas
} from '../../../utils/calendar'
import { ref, computed, reactive } from 'vue'
import dayjs from 'dayjs'
export default {
  props: {
    type: 'week' | 'month'
  },
  data() {
    return {
      Header: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  emits: ['changeType'],
  setup(props, context) {
    const { type } = props
    const current = ref(new Date())
    const days = computed(() => {
      if (type === 'month') {
        return fillCalendarDatas(current.value)
      } else {
        return fillCalendarDatas(current.value)
      }
    })
    const dayRef = reactive({
      day: days
    }) // 当前月的天数

    // 右滑
    const nextMonth = () => {
      if (type === 'week') {
        // 切换周试图
        current.value = dayjs(current.value).add(1, 'month')
      } else {
        // 切换月试图
        current.value = dayjs(current.value).add(1, 'month')
      }
    }

    // 左滑
    const lastMonth = () => {
      if (type === 'week') {
        // 切换周试图
        current.value = dayjs(current.value).add(-1, 'month')
      } else {
        current.value = dayjs(current.value).add(-1, 'month')
      }
    }

    // 切换模式
    const changeType = () => {
      context.emit('changeType')
    }

    return { dayRef, nextMonth, current, lastMonth, changeType }
  }
}
</script>

<style scoped lang="less">
.calendar {
  height: 50vh;
  overflow-y: scroll;
  ul {
    position: relative;
    margin: 0;
    pad: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    li {
      list-style: none;
      border-top: 0;
      border-left: 0;
      width: calc(100% / 7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #333;
      padding: 10px 0;
      font-size: 14px;
      .day {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: #eee;
        }
      }
    }
    .header {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
