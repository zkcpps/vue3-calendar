<template>
  <div class="calendar_wrap">
    <div
      class="calendar"
      :style="{ height: calendarType === 'week' ? '21.6vh' : '43.6vh' }"
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
        :style="{ height: calendarType === 'week' ? '15vh' : '36.5vh' }"
      >
        <lazy-component preload="15vh">
          <ul>
            <li
              v-for="(item, index) in days.monthDatas"
              :key="`day-${index}`"
              @click="clickDate(item, $event)"
              :id="item.dateString"
              v-lazy="li"
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
                <img
                  v-if="item.status === 1"
                  src="@/assets/images/finish.png"
                />
                <img
                  v-if="item.status === 2"
                  src="@/assets/images/no_finish.png"
                />
              </div>
            </li>
          </ul>
        </lazy-component>
      </div>
    </div>
    <div class="showDate" @touchstart="touchstart" @touchmove="touchend">
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
import { ref, reactive, computed, onMounted, watchEffect } from 'vue'
import dayjs from 'dayjs'
export default {
  props: {
    date: Date,
    userId: String,
    type: String
  },
  data() {
    return {
      Header: ['日', '一', '二', '三', '四', '五', '六']
    }
  },
  emits: ['changeCurrentDate', 'changeType'],
  setup(props, context) {
    // 监听选中的日期
    const currentDate = computed(() => {
      return props.date
    })

    //监听日历类型
    const calendarType = computed(() => {
      return props.type
    })

    const days = reactive({ monthDatas: [] })
    const currentDateString = dayjs(new Date()).format('YYYYMMDD')

    const startY = ref(0)

    // 格式化时间
    const formatTime = (date, format = 'YYYYMMDD') => dayjs(date).format(format)

    // 定位到元素
    const scrollToDomById = (id) => {
      console.log('定位到', id)
      document.getElementById(id) &&
        document.getElementById(id).scrollIntoView({
          behavior: 'instant',
          block: 'start',
          inline: 'nearest'
        })
    }

    const touchstart = (e) => {
      startY.value = e.changedTouches[0].pageY
    }

    const touchend = (e) => {
      if (e.changedTouches[0].pageY - startY.value < -10) {
        if (calendarType !== 'week') {
          changeType('week')
          scrollToDomById(formatTime(props.date, 'YYYYMMDD')) // 上滑到周要定位到选中的日期那里
        }
      }
      if (e.changedTouches[0].pageY - startY.value > 30) {
        if (calendarType !== 'month') {
          changeType('month')
          scrollToDomById(formatTime(props.date, 'YYYYMMDD')) // 上滑到周要定位到选中的日期那里
        }
      }
    }
    watchEffect(() => {
      // 获取数据
      fetchCustomerEventStatus({
        userId: props.userId,
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
          scrollToDomById(formatTime(new Date(), 'YYYYMMDD'))
        }, 500)
      })
    })

    watchEffect(() => {
      scrollToDomById(formatTime(props.date, 'YYYYMMDD')) // 左右切换日期监听日期并跳转到日期
    })

    // 点击选中日期
    const clickDate = (date) => {
      context.emit('changeCurrentDate', date.dateString)
    }

    // 点击选中日期
    const changeType = (data) => {
      context.emit('changeType', data)
    }

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
      calendarType,
      clickDate,
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
      line-height: 6.5vh;
      padding: 0;
      margin: 0;
      position: fixed;
      top: 0;
      width: 100%;
      font-size: 12px;
      font-family: PingFangSC;
      color: #333333;
      border-bottom: 1px solid #e8e8e8;
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
      position: fixed;
      top: 6.5vh;
      width: 100%;
      font-size: 12px;
      color: #333333;
      //border-bottom: 1px solid #e8e8e8;
      z-index: 999;
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
        width: 7.2vw;
        height: 7.2vw;
        color: #ffffff;
        line-height: 7.2vw;
        background: #1690ff;
        text-align: center;
        border-radius: 50%;
      }
      .current {
        color: #1690ff;
      }
      .icon {
        position: absolute;
        top: 3.2vh;
        img {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }
    }
  }
  .showDate {
    //height: 3vh;
    line-height: 3vh;
    padding-top: 2vh;
    padding-left: 5vw;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 600;
    color: #333333;
    position: relative;
    background: #ffffff;
    z-index: 1000;
  }
}
</style>