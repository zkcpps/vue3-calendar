<!--  -->
<template>
  <div>
    <div class="header">
      <div class="selector">
        <Popup @Sondata="getdata" />
      </div>
      <div class="header_resoult">
        <span>共有{{ fna }}个FNA,</span>
        <span>{{ report }}个解释报告,</span>
        <span>{{ facilitate }}个促成</span>
      </div>
    </div>
    <van-cell-group class="body">
      <van-cell
        class="resoult_list"
        v-for="(item, index) in data.data"
        :key="index"
      >
        <div class="list_left">{{ formater(item.eventStartTime) }}</div>
        <div
          class="list_right"
          :style="{ borderLeft: '2px solid ' + eventType[item.eventType] }"
        >
          <div class="list_right_context">
            {{ item.eventUserName + item.fnaType + item.eventDescription }}
          </div>

          <div class="list_right_time">
            {{
              formater(item.eventStartTime) + '-' + formater(item.eventEndTime)
            }}
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import Popup from './Popup.vue'
import { fetchCalEventsGetCalEvents } from '../../../services/calendar'
import { formater } from '../../../utils/tool'
export default {
  name: '',
  setup() {
    //   接收的数据
    let data = reactive({ data: [] })

    //   顶部区域显示的总数，FNA，report，facilitate
    let fna = ref(0)
    // 报告
    let report = ref(0)
    // 促成
    let facilitate = ref(0)
    // 格式化时间

    // 根据事件类型显示不同的颜色
    let eventType = {
      1: '#5ED797',
      2: '#f26c6c',
      3: '#f5d383',
      4: '#ca76ff',
      6: '#f7a864',
      10: '#5ED797'
    }

    //   选择某个人，调用方法获取数据
    const getdata = async (e: any) => {
      let userId = e.data.userId
      const res = await fetchCalEventsGetCalEvents({
        userId: '18145736491',
        eventStartTime: 1637683200,
        eventEndTime: 1638460800
      })
      if (res.code === 200) {
        data.data = []
        data.data = res.data
        fna.value = 0
        report.value = 0
        facilitate.value = 0
      } else {
        Toast('请稍后重试')
      }
      // 计算头部三种类型的总数
      data.data.forEach((item) => {
        if (item.eventType === 2) {
          fna.value++
        } else if (item.eventType === 3) {
          report.value++
        } else if (item.eventType === 4) {
          facilitate.value++
        }
      })
    }

    return {
      data,
      getdata,
      fna,
      report,
      facilitate,
      eventType,
      formater
    }
  },
  components: {
    Popup
  }
}
</script>
<style lang="less" scoped>
// 头部区域
.header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 14px 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;

  .selector {
    display: inline-block;
  }
  .header_resoult {
    display: inline-block;
    margin-left: 10px;
    span {
      font-size: 12px;
      margin-left: 8px;
      color: #666666;
    }
  }
}
// 结果列表

.body {
  margin-bottom: 60px;
  .resoult_list {
    .list_left {
      display: inline-block;
      position: relative;
      top: -20%;
      color: #999999;
      font-size: 12px;
      font-weight: 400;
    }
    .list_right {
      display: inline-block;
      width: 70%;
      margin-left: 10px;
      padding-left: 8px;
      border-left: 2px solid red;
      .list_right_context {
        color: #333333;
        font-size: 16px;
      }
      .list_right_time {
        color: #999999;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}
</style>
