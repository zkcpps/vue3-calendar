<template>
  <div class="calendar">
    <button @click="lastMonth">上一月</button>
    <button @click="nextMonth">下一月</button>
    <ul>
      <li
        class="header"
        v-for="(item, index) in Header"
        :key="`header-${index}`"
      >
        {{ item }}
      </li>
      <li class="header" v-for="(item, index) in dayRef" :key="`day-${index}`">
        <span class="day" v-if="item.show">{{ item.show }}</span>
        <span class="day" v-else>{{ item.day }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { fillCalendarDatas } from '../../../utils/calendar'
import { ref } from 'vue'
import dayjs from 'dayjs'
export default {
  props: {},
  data() {
    return {
      Header: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  setup(props) {
    const current = ref(new Date())
    const days = fillCalendarDatas(current.value)
    const dayRef = ref(days) // 当前月的天数
    console.log('dayRef', dayRef)

    // 左右滑动切换上下月
    const nextMonth = () => {
      current.value = dayjs(current.value).add(1, 'month')
      dayRef.value = fillCalendarDatas(current.value)
    }

    const lastMonth = () => {
      current.value = dayjs(current.value).add(-1, 'month')
      dayRef.value = fillCalendarDatas(current.value)
    }

    return { dayRef, nextMonth, current, lastMonth }
  }
}
</script>

<style scoped lang="less">
.calendar {
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
