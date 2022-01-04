<template>
  <div>
    <calendar-header
      :userId="userId"
      :headerData="headerDatas"
      @changeUserId="changeUserId"
      @setUserInfo="setUserInfo"
    />
    <Calendar
      :date="currentDate"
      :userId="userId"
      :type="type"
      @changeCurrentDate="changeCurrentDate"
      @changeType="changeType"
    />
    <HoverButton @click="toWeekView" v-show="showButton" />
    <CalendarList
      :style="{
        overflowY: 'scroll',
        height: type === 'month' ? '50vh' : '72vh'
      }"
      :userId="userId"
      :date="currentDate"
      @touchstart="touchstart"
      @touchend="touchend"
      @changeShowButton="changeShowButton"
      @setHeaderData="setHeaderData"
    ></CalendarList>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import Calendar from '../../components/Calendar'
import Popup from './components/Popup.vue'
import HoverButton from './components/HoverButton.vue'
import CalendarList from './components/CalendarList.vue'
import CalendarHeader from './components/CalendarHeader.vue'

import dayjs from 'dayjs'
export default {
  components: {
    Calendar,
    Popup,
    HoverButton,
    CalendarList,
    CalendarHeader
  },
  setup() {
    // 测试用，正式删除
    //sessionStorage.setItem('userId', 18145736491)
    const currentDate = ref(new Date())
    const userId = ref(sessionStorage.getItem('userId'))
    const type = ref('week')
    const headerDatas = reactive({})
    let touchstarts = ref()
    const showButton = ref(true) // 控制打开弹框时隐藏

    const userInfo = reactive({}) // 存储userInfo，用于列表事件

    const changeCurrentDate = (dateString) => {
      currentDate.value = new Date(dayjs(dateString).valueOf())
    }
    const touchstart = (e) => {
      touchstarts.value = e.changedTouches[0].clientX
    }
    const touchend = (e) => {
      let touchLenght = touchstarts.value - e.changedTouches[0].clientX
      if (touchLenght > 100) {
        currentDate.value = new Date(
          dayjs(currentDate.value).add(1, 'day').valueOf()
        )
      } else if (touchLenght < -100) {
        currentDate.value = new Date(
          dayjs(currentDate.value).add(-1, 'day').valueOf()
        )
      }
    }

    const changeUserId = (id) => {
      userId.value = id
    }

    const changeType = (data) => {
      type.value = data
    }

    // 跳转周试图
    const toWeekView = () => {
      window.open(
        `https://blue.planplus.cn/chat-tool-bar/main-app/calender/#/?userId=${userId.value}`
      )
    }

    // 改变悬浮按钮显示
    const changeShowButton = (flag) => {
      showButton.value = flag
    }

    // 存储header数据
    const setHeaderData = (value) => {
      headerDatas.data = value
    }

    const setUserInfo = (data) => {
      userInfo.data = data
    }

    return {
      currentDate,
      userId,
      type,
      changeCurrentDate,
      touchstart,
      touchend,
      changeUserId,
      changeType,
      toWeekView,
      showButton,
      changeShowButton,
      headerDatas,
      setHeaderData
    }
  }
}
</script>

<style scoped></style>
