<template>
  <div class="calendar_wrap">
    <div
      class="calendar"
      :style="{ height: type === 'week' ? '24vh' : '46vh' }"
    >
      <div class="header">
        <ul>
          <li v-for="(item, index) in Header" :key="`header-${index}`">
            {{ item }}
          </li>
        </ul>
      </div>
      <div
        class="content"
        :style="{ height: type === 'week' ? '15vh' : '36.5vh' }"
      >
        <ul>
          <li
            v-for="(item, index) in days.monthDatas"
            :key="`day-${index}`"
            @click="clickDate(item)"
            :id="item.dateString"
          >
            <span
              class="day"
              v-bind:class="{
                current:
                  item.dateString === currentDateString &&
                  item.dateString !== formatTime(currentDate),
                active: item.dateString === formatTime(currentDate)
              }"
            >
              {{ item.value }}
            </span>
            <div class="icon">
              <img v-if="item.status === 1" src="@/assets/images/finish.png" />
              <img
                v-if="item.status === 2"
                src="@/assets/images/no_finish.png"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="showDate" @touchstart="touchstart" @touchend="touchend">
      <span v-show="showDate(currentDate) !== ''"
        >{{ showDate(currentDate) }} &nbsp;·&nbsp;</span
      >&nbsp; <span>{{ formatTime(currentDate, 'MM月DD日') }}</span
      >&nbsp;
      <span>{{ showDay(currentDate) }}</span>
    </div>
  </div>
</template>

<script>
import {
  fillCalendarDatas,
  getFirstAndLastTimes,
  addDayByDayjs
} from '../../../utils/calendar'
import { fetchCustomerEventStatus } from '../../../services/calendar'
import { ref, reactive, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
export default {
  props: {
    date: Date
  },
  data() {
    return {
      Header: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  emits: ['changeCurrentDate'],
  setup(props, context) {
    // 监听选中的日期
    const currentDate = computed(() => {
      return props.date
    })

    const days = reactive({ monthDatas: [] })
    const currentDateString = dayjs(new Date()).format('YYYYMMDD')

    const type = ref('week')
    const startY = ref(0)

    const touchstart = (e) => {
      startY.value = e.changedTouches[0].pageY
    }

    const touchend = (e) => {
      if (e.changedTouches[0].pageY - startY.value < -50) {
        if (type.value !== 'week') {
          type.value = 'week'
        }
      }
      if (e.changedTouches[0].pageY - startY.value > 50) {
        if (type.value !== 'month') {
          type.value = 'month'
        }
      }
    }

    // 获取数据
    fetchCustomerEventStatus({
      userId: '18998811857',
      eventStartTime: getFirstAndLastTimes(addDayByDayjs(new Date(), -420))
        .start,
      eventEndTime: getFirstAndLastTimes(addDayByDayjs(new Date(), 420)).end
    }).then((res) => {
      if (res.code === 200 && res.data) {
        days.monthDatas = fillCalendarDatas(new Date(), res.data)
      } else {
        days.monthDatas = fillCalendarDatas(new Date())
      }
      setTimeout(() => {
        document.getElementById(formatTime(new Date()))?.scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest'
        })
      })
    })

    // 点击选中日期
    const clickDate = (date) => {
      context.emit('changeCurrentDate', date.dateString)
    }

    // 格式化时间
    const formatTime = (date, format = 'YYYYMMDD') => dayjs(date).format(format)

    // 显示周几
    const showDay = (date) =>
      '周' + ['日', '一', '二', '三', '四', '五', '六'][dayjs(date).day()]

    // 监听选中的日期是否是（昨天今天或者明天）
    const showDate = (date) => {
      if (formatTime(dayjs(date).add(1, 'day')) === formatTime(new Date())) {
        return '昨天'
      } else if (formatTime(dayjs(date)) === formatTime(new Date())) {
        return '今天'
      } else if (
        formatTime(dayjs(date).add(-1, 'day')) === formatTime(new Date())
      ) {
        return '明天'
      } else {
        return ''
      }
    }

    return {
      days,
      currentDateString,
      currentDate,
      clickDate,
      type,
      touchstart,
      touchend,
      formatTime,
      showDate,
      showDay
    }
  }
}
</script>

<style scoped lang="less">
@font-face {
  font-family: 'PingFangSC';
  src: url('@/assets/fonts/D-DIN-Bold.otf') format('otf'),
    url('@/assets/fonts/D-DIN-Bold.otf') format('woff'),
    /* Modern Browsers */ url('@/assets/fonts/D-DIN-Bold.otf')
      format('truetype'); /* Safari, Android, iOS */
}
.calendar_wrap {
  background: #f6f6f6;
  .calendar {
    padding: 0;
    margin: 0;
    .header {
      height: 6.5vh;
      line-height: 8vh;
      padding: 0;
      margin: 0;
      position: fixed;
      top: 0;
      width: 100%;
      font-size: 12px;
      font-family: PingFangSC;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
      z-index: 99;
      ul {
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
        }
      }
    }
    .content {
      overflow-y: scroll;
      position: absolute;
      margin-top: 50px;
      width: 100%;
      font-size: 12px;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        li {
          height: 7.2vh;
          line-height: 7.2vh;
          list-style: none;
          border-top: 0;
          border-left: 0;
          width: calc(100% / 7);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          position: relative;
        }
      }
      .active {
        width: 8vw;
        height: 8vw;
        color: #ffffff;
        line-height: 8vw;
        background: #1690ff;
        text-align: center;
        border-radius: 50%;
      }
      .current {
        color: #1690ff;
      }
      .icon {
        position: absolute;
        top: 3vh;
        img {
          width: 2.5vw;
          height: 2.5vw;
        }
      }
    }
  }
  .showDate {
    height: 5vh;
    line-height: 3 vh;
    padding-left: 4vw;
    font-size: 4vw;
    font-family: PingFangSC;
    font-weight: 600;
    color: #333333;
  }
}
</style>
