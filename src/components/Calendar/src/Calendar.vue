<template>
  <div class="calendar">
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
        v-for="(item, index) in day"
        :key="`day-${index}`"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
 import * as dayjs from 'dayjs';
export default {
  props: {
    title: String,
  },
  data() {
    return {
       Header: ["日", "一", "二", "三", "四", "五", "六"],
       day: []
    };  
  },
  setup(props) {
    dayjs.extend(isoWeek)
    console.log(dayjs(new Date()).isoWeekday());

  },
};
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
