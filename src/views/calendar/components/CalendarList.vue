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
        @click="detailView(item)"
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
    <!-- 点击事件的详情弹窗 -->
    <van-action-sheet v-model:show="show" title="查看事件" :round="false">
      <div class="content">
        <div class="detail">
          <div class="detail_left">
            <van-image
              class="imge"
              fit="cover"
              round
              :src="detailData.data.avatar"
            />
            <div class="name">
              <span
                >{{ detailData.data.nickName }}
                <img
                  :src="genderIconMap(detailData.data.gender)"
                  :style="{ width: '16px', height: '16px' }"
                />
                <!-- <van-icon name=""></van-icon> -->
              </span>
              <span ref="number"
                >{{ detailData.data.mobile }}
                <img
                  src="@/assets/images/copy.png"
                  :style="{ width: '16px', height: '16px' }"
                  @click="copyNum('123456789')"
                />
              </span>
            </div>
          </div>
          <!-- 链接 -->
          <a>客户详情></a>
        </div>
        <div class="contents">
          <li>
            <span>预约时间:</span>
            <p>
              {{ detailData.data.lastCommunicationDate }}
              {{ detailData.data.lastCommunicationStartTime }}
            </p>
          </li>

          <li>
            <span>预约事项:</span>
            <p>{{ detailData.data.serviceProject }}</p>
          </li>

          <li>
            <span>上次跟进:</span>
            <p>{{ detailData.data.lastCommunicationEndTime }}</p>
          </li>

          <li>
            <span> 上次备注:</span>
            <p>{{ detailData.data.remark }}</p>
          </li>
        </div>

        <div class="footer">
          <van-button
            plain
            type="primary"
            size="small"
            :style="{ margin: '0 10px' }"
            >规划方案</van-button
          >
          <van-button plain type="primary" size="small">发消息</van-button>

          <van-button
            plain
            type="primary"
            size="small"
            :style="{ margin: '0 10px' }"
            >改约</van-button
          >
          <van-button type="primary" size="small">添加跟进</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang="ts">
import woman from '@/assets/images/woman.png'
import man from '@/assets/images/man.png'
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
import Popup from './Popup.vue'
import {
  fetchCalEventsGetCalEvents,
  fetchCustomerLastFollowInfo
} from '@/services/calendar'
import { formater } from '@/utils/tool'
export default {
  name: '',
  setup() {
    //   接收的数据
    let data = reactive({ data: [] })
    let detailData = reactive({ data: [] })

    // 控制点击事件的弹窗
    let show = ref(false)

    //   顶部区域显示的总数，FNA，report，facilitate
    let fna = ref(0)
    let report = ref(0)
    let facilitate = ref(0)

    // 点击获取手机号
    let number = ref(null)

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
    //  选中事件后弹出详情
    const detailView = async (item: any) => {
      //自定义事件跟请假不能弹窗
      if (item.eventType === 6 || item.eventType === 10) {
        Toast('不能查看自定义事件跟请假事件')
        return false
      }
      show.value = true
      const res = await fetchCustomerLastFollowInfo({
        id: item.id + '',
        mobile: item.id + '',
        unionId: item.unionId,
        serviceProject: item.serviceProject,
        userId: item.userId
      })
      if (res.code !== 200) {
        Toast('获取事件详情失败')
      }
      detailData.data = res.data
      console.log(detailData)
    }

    // 性别图标
    const genderIconMap = (type: any) => {
      if (type === 1) {
        return false
      } else if (type === 2) {
        console.log('222')
        return man
      } else {
        console.log('1')

        return woman
      }
    }
    //  点击复制手机号码
    const copyNum = (num) => {
      const aux = document.createElement('input')
      //   value 值后期通过方法的参数传进来
      aux.setAttribute('value', number.value.innerText)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      Toast('复制成功')
    }

    return {
      data,
      getdata,
      fna,
      report,
      facilitate,
      eventType,
      formater,
      detailView,
      show,
      copyNum,
      number,
      detailData,
      genderIconMap,
      woman,
      man
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

// 点击事件的弹窗
.content {
  background-color: #ffffff;
  padding: 16px 16px 160px;
  .detail {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    // 左侧布局
    .detail_left {
      display: flex;
      justify-content: flex-start;
      .imge {
        width: 36px;
        height: 36px;
      }
      .name {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
      }
    }
    // 右侧链接布局
    a {
      font-size: 12px;
      font-weight: 400;
      color: #1690ff;
      line-height: 33px;
    }
  }
  // 内容区域
  .contents {
    padding-left: 44px;
    padding-top: 15px;
    height: 800px;
    li {
      display: flex;
      margin-bottom: 5px;
      span {
        margin-right: 5px;
        list-style: none;
        color: #666666;
        font-size: 14px;
      }
    }
    p {
      margin: 0;
      padding: 0;
      width: 70%;
      display: inline-block;
      font-size: 14px;
      color: #333333;
    }
  }
  //   底部按钮区域
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 18px 40px 20px;
    button {
      width: 66px;
    }
  }
}
//  弹窗占屏幕百分比
:deep(.van-action-sheet) {
  height: 60%;
}
// 弹窗标题样式
:deep(.van-action-sheet__header) {
  text-align: center;
  margin-top: 8px;
  font-size: 20px;
  border-bottom: 1px solid #e8e8e8;
  color: #333333;
  font-weight: 600;
}
</style>
