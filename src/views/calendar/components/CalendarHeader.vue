<template>
  <div>
    <div class="header">
      <div class="selector">
        <Popup @Sondata="getdata" />
      </div>
      <div class="header_resoult">
        <span>共有{{ headerData.data?.fna || 0 }}个FNA,</span>
        <span>{{ headerData.data?.report || 0 }}个解释报告,</span>
        <span>{{ headerData.data?.facilitate || 0 }}个促成</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watchEffect, computed } from 'vue'
import { Toast } from 'vant'
import Popup from './Popup.vue'
import NotWork from '@/components/NotWork'

import {
  fetchCalEventsGetCalEvents,
  fetchCustomerLastFollowInfo,
  fetchTrainProLogin
} from '@/services/calendar'
import { formater, getParams, isMobile } from '@/utils/tool'
import { getFirstAndLastTimes } from '@/utils/calendar'
import dayjs from 'dayjs'
import { eventTypeMap } from '../data'
export default {
  name: '',
  components: {
    Popup
  },
  props: {
    userId: String,
    headerData: Object
  },
  emits: ['changeUserId'],
  setup(props, context) {
    //   接收的数据
    let data: any = reactive({ data: [] })

    // 顶部区域显示的总数，FNA，report，facilitate
    let fna = ref(0)
    let report = ref(0)
    let facilitate = ref(0)

    watchEffect(() => {
      fna.value = props.headerData.fna
      report.value = props.headerData.report
      facilitate.value = props.headerData.facilitate
    })

    const getdata = (e: any) => {
      let userId = e.data.userId
      context.emit('changeUserId', userId)
    }

    return {
      data,
      fna,
      report,
      getdata
    }
  }
}
</script>
<style lang="less" scoped>
// 头部区域
.header {
  position: fixed;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 100%;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  .selector {
    display: inline-block;
  }
  .header_resoult {
    display: inline-block;
    margin-left: 10px;
    margin-top: 6px;
    span {
      font-size: 12px;
      margin-left: 8px;
      color: #666666;
    }
  }
}
</style>
