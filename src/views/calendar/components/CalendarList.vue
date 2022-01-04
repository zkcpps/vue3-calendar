<template>
  <div>
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
          :style="{
            borderLeft:
              '2px solid ' +
              (item.eventStatus === 2 // 完成
                ? '#70bbf4'
                : item.eventStatus === 6 // 请假
                ? '#b9bbcd'
                : eventType[item.eventType])
          }"
        >
          <div class="list_right_context">
            <span v-if="item.eventType === 6" :style="{ color: '#999999' }">
              {{ item.eventDescription }}
            </span>
            <span
              v-else-if="item.eventType === 1"
              :style="{ color: '#999999' }"
            >
              空闲
            </span>
            <span
              v-else-if="item.eventType === 10"
              :style="{ color: '#999999' }"
            >
              请假
            </span>
            <span v-else
              >{{
                item.eventUserName +
                '-' +
                item.fnaType +
                '-' +
                item.eventDescription
              }}
              <span v-show="item.eventStatus === 6">(飞机)</span>
              <span v-show="item.eventStatus === 10">(爽约)</span>
              <span v-show="item.completionResult && item.eventStatus === 2"
                >({{ item.completionResult }})</span
              >
              <img
                v-show="item.isUseApplet === 1"
                src="@/assets/images/applets.svg"
                alt="小程序icon"
              />
            </span>
          </div>

          <div class="list_right_time">
            {{
              formater(item.eventStartTime) + '-' + formater(item.eventEndTime)
            }}
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <div v-if="data.data.length === 0" class="notWork">
      <NotWork />
    </div>
    <!-- 点击事件的详情弹窗 -->
    <van-action-sheet
      v-model:show="show"
      title="查看事件"
      :round="false"
      @closed="onClosed"
    >
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
              <span class="nikeName"
                >{{ detailData.data.nickName }}

                <img
                  v-if="detailData.data.gender === 2"
                  src="@/assets/images/man.png"
                  :style="{ width: '16px', height: '16px' }"
                />
                <img
                  v-if="detailData.data.gender === 3"
                  src="@/assets/images/woman.png"
                  :style="{ width: '16px', height: '16px' }"
                />
              </span>
              <span ref="number" class="mobile"
                >{{ detailData.data.mobile }}
                <img
                  src="@/assets/images/copy.png"
                  :style="{ width: '16px', height: '16px' }"
                  @click="copyNum(detailData.data.mobile)"
                />
              </span>
            </div>
          </div>
          <!-- 链接 -->
          <a @click="toUserDetail"
            ><span
              >客户详情
              <van-icon
                name="arrow"
                style="
                   {
                    color: #1690ff;
                  }
                "
              />
            </span>
          </a>
        </div>
        <div class="contents">
          <li>
            <span>预约时间:</span>
            <p>
              {{
                event.data.eventStartTime
                  ? `${dayjs(event.data.eventStartTime * 1000).format(
                      'YYYY/MM/DD'
                    )} ${
                      dayjs(event.data.eventStartTime * 1000).format('HH:mm') +
                      '-' +
                      dayjs(event.data.eventEndTime * 1000).format('HH:mm')
                    }`
                  : '--'
              }}
            </p>
          </li>

          <li>
            <span>预约事项:</span>
            <p>
              {{
                detailData.data.serviceProject +
                  '-' +
                  eventTypeMap[event.data.eventType] || '--'
              }}
            </p>
          </li>

          <li>
            <span>上次跟进:</span>
            <p>
              {{
                detailData.data.lastCommunicationDate
                  ? `${detailData.data.lastCommunicationDate} ${detailData.data.lastCommunicationStartTime}`
                  : '--'
              }}
            </p>
          </li>

          <li>
            <span> 上次备注:</span>
            <p class="">{{ detailData.data.remark || '--' }}</p>
          </li>
        </div>
        <div class="footerContent">
          <van-divider
            style="
               {
                margin: 0;
              }
            "
          />
          <div v-show="isCurrentUserId" class="footer">
            <van-button
              @click="toPulanPlan"
              plain
              type="primary"
              size="small"
              :style="{ margin: '0 10px' }"
              >规划方案</van-button
            >
            <van-button
              @click="handleSendNews"
              v-show="
                detailData.data.externalUserId && detailData.data.isFirend
              "
              plain
              type="primary"
              size="small"
              >发消息</van-button
            >
            <van-button
              v-show="
                detailData.data.externalUserId &&
                isMobile() &&
                !detailData.data.isFirend
              "
              @click="handleAddFriends"
              plain
              type="primary"
              size="small"
              :style="{ margin: '0 10px' }"
              >加好友</van-button
            >
            <van-button
              v-show="!detailData.data.externalUserId && isMobile()"
              @click="handleAddFriends"
              plain
              type="primary"
              size="small"
              :style="{ margin: '0 10px' }"
              >加好友</van-button
            >

            <van-button
              @click="handleContract"
              plain
              type="primary"
              size="small"
              :style="{ margin: '0 10px' }"
              >改约</van-button
            >
            <van-button type="primary" size="small" @click="handleAddFollowUp"
              >添加跟进</van-button
            >
          </div>
        </div>
      </div>
    </van-action-sheet>
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
  fetchTrainProLogin,
  fetchUserInfo
} from '@/services/calendar'
import { formater, getParams, isMobile } from '@/utils/tool'
import { getFirstAndLastTimes } from '@/utils/calendar'
import dayjs from 'dayjs'
import { eventTypeMap } from '../data'
export default {
  name: '',
  components: {
    Popup,
    NotWork
  },
  props: {
    date: Date,
    userId: String
  },
  emits: ['changeShowButton', 'setHeaderData'],
  setup(props, context) {
    //   接收的数据
    let data: any = reactive({ data: [] })
    let detailData: any = reactive({ data: [] })
    const event: any = reactive({ data: {} })
    const userInfo: any = reactive({ data: {} })

    // 控制点击事件的弹窗
    let show = ref(false)

    //   顶部区域显示的总数，FNA，report，facilitate
    let fna = ref(0)
    let report = ref(0)
    let facilitate = ref(0)

    const isCurrentUserId = computed(() => {
      return props.userId === sessionStorage.getItem('userId')
    })

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

    // 选择人员或者更改日期触发查询
    watchEffect(async () => {
      const day = getFirstAndLastTimes(props.date)
      const res = await fetchCalEventsGetCalEvents({
        userId: props.userId,
        eventStartTime: day.start,
        eventEndTime: day.end,
        invalidEventsFilter: true
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
      data.data.forEach((item: any) => {
        if (item.eventType === 2) {
          fna.value++
        } else if (item.eventType === 3) {
          report.value++
        } else if (item.eventType === 4) {
          facilitate.value++
        }
      })
      context.emit('setHeaderData', {
        fna: fna.value,
        report: report.value,
        facilitate: facilitate.value
      }) // 暴露header数据
    })

    // 获取理财师信息
    fetchUserInfo({
      userId: sessionStorage.getItem('userId')
    }).then((res: any) => {
      if (res.code === 200 && res.data) {
        userInfo.data = res.data.name
      }
    })

    //  选中事件后弹出详情
    const detailView = async (item: any) => {
      //自定义事件,请假,空闲不能弹窗
      if (
        item.eventType === 6 ||
        item.eventType === 10 ||
        item.eventType === 1
      ) {
        // Toast('不能查看自定义事件跟请假事件')
        return false
      }
      console.log('item', item)

      event.data = item
      show.value = true
      context.emit('changeShowButton', false) // 隐藏悬浮按钮
      const res = await fetchCustomerLastFollowInfo({
        id: item.id + '',
        mobile: item.eventUserPhone + '',
        unionId: item.unionId,
        serviceProject: item.fnaType,
        userId: item.userId
      })
      if (res.code !== 200) {
        Toast('获取事件详情失败')
      }
      detailData.data = res.data
      console.log(detailData)
    }

    //  点击复制手机号码
    const copyNum = (num: string) => {
      const aux = document.createElement('input')
      //   value 值后期通过方法的参数传进来
      aux.setAttribute('value', num)
      document.body.appendChild(aux)
      aux.select()
      document.execCommand('copy')
      document.body.removeChild(aux)
      Toast('复制成功')
    }

    // 跳转规划方案
    const toPulanPlan = async () => {
      const resp: any = await fetchTrainProLogin({
        userId: sessionStorage.getItem('userId'),
        unionid: event.data.unionId,
        remarkmobile: event.data.mobile || event.data.eventUserPhone,
        kind: 'pro'
      })

      if (resp.code === 200 && resp.data) {
        const params = getParams(resp.data)

        window.open(
          `https://report.planplus.cn/report/loginLoading?channel=planPro&customerId=${params.customerId}&currentUserId=${params.userId}`
        )
        return
      }

      Toast.fail('不存在此家庭!')
    }

    // 发消息
    const handleSendNews = () => {
      if (!event.data.externalUserId) {
        Toast.fail('外部联系人不存在')
        return
      }

      window.wx.openEnterpriseChat({
        // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
        // userIds: b.follow_user[0].userid, //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
        externalUserIds: event.data.externalUserId, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
        groupName: '', // 会话名称。单聊时该参数传入空字符串""即可。
        chatId: '', // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
        success: function (res: any) {
          // const chatId = res.chatId; //返回当前群聊ID，仅当使用agentConfig注入该接口权限时才返回chatId
          // 回调
        },
        fail: function (res: any) {
          if (res.errMsg.indexOf('function not exist') > -1) {
            alert('版本过低请升级')
          }
        }
      })
    }

    // 加好友
    const handleAddFriends = () => {
      if (event.data.blueUserId === '') {
        Toast.fail('此事件不是跟进事件')
        return
      }

      if (detailData.data.externalUserId) {
        window.wx.invoke(
          'openUserProfile',
          {
            type: 2, //1表示该userid是企业成员，2表示该userid是外部联系人
            userid: detailData.data.externalUserId //可以是企业成员，也可以是外部联系人
          },
          function (res: any) {
            if (res.err_msg !== 'openUserProfile:ok') {
              //错误处理
              console.error(res.err_msg)
            }
          }
        )
      } else {
        // 没有外部联系人ID，则跳到添加客户界面
        window.wx.invoke('navigateToAddCustomer', {}, function (res: any) {})
      }
    }

    // 改约
    const handleContract = () => {
      if (event.data.blueUserId === '') {
        Toast.fail('此事件不是跟进事件')
        return
      }

      window.open(
        `https://blue.planplus.cn/chat-tool-bar/customer/#/FollowUpV2?externaluserid=${
          detailData.data.externalUserId
        }&uid=${event.data.eventUserid}&userId=${sessionStorage.getItem(
          'userId'
        )}&planType=${event.data.eventType}&consultant=${
          userInfo.data.name
        }&contract=1&mobile=${
          event.data.mobile || event.data.eventUserPhone
        }&calendar=1&unionId=${event.data.unionId}&blueUserId=${
          event.data.blueUserId
        }`
      )
    }

    // 跳转客户详情
    const toUserDetail = () => {
      window.open(
        `https://blue.planplus.cn/chat-tool-bar/main-app/subapp_detail/#/?kind=2&externaluserid=${
          detailData.data.externalUserId
        }&userid=${sessionStorage.getItem('userId')}&type=2&mobile=${
          event.data.mobile || event.data.eventUserPhone
        }`
      )
    }

    // 添加跟进
    const handleAddFollowUp = () => {
      console.log(detailData.data.eventUserid)

      window.open(
        `https://blue.planplus.cn/chat-tool-bar/customer/#/FollowUpV2?externaluserid=${
          detailData.data.externalUserId
        }&uid=${event.data.eventUserid}&userId=${sessionStorage.getItem(
          'userId'
        )}&planType=${event.data.eventType}&consultant=${
          userInfo.data.name
        }&mobile=${
          event.data.mobile || event.data.eventUserPhone
        }&calendar=1&unionId=${event.data.unionId}&blueUserId=${
          detailData.data.externalUserId
        }`
      )
    }

    // 弹窗关闭方法，触发悬浮球显示
    const onClosed = () => {
      context.emit('changeShowButton', true)
    }

    return {
      data,
      event,
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
      dayjs,
      eventTypeMap,
      isCurrentUserId,
      isMobile,
      toPulanPlan,
      handleSendNews,
      handleAddFriends,
      handleContract,
      userInfo,
      toUserDetail,
      handleAddFollowUp,
      onClosed
    }
  }
}
</script>
<style lang="less" scoped>
// 结果列表
.body {
  margin-bottom: 60px;
  margin-top: 45px;
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
        img {
          width: 18px;
          height: 18px;
          position: absolute;
          top: 4px;
          margin-left: 2px;
        }
      }
      .list_right_time {
        color: #999999;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
}

.notWork {
  position: relative;
  top: 10vh;
}

// 点击事件的弹窗
.content {
  background-color: #ffffff;
  padding: 16px 22px;
  .detail {
    position: relative;
    top: 0;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    // 左侧布局
    .detail_left {
      display: flex;
      justify-content: flex-start;
      .imge {
        width: 40px;
        height: 40px;
      }
      .name {
        height: 40px;
        .nikeName {
          font-weight: bolder;
          color: #333333;
          font-size: 16px;
        }
        .mobile {
          font-size: 14px;
        }
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        color: #999999;
        font-weight: 400;
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
    li {
      display: flex;
      margin-bottom: 5px;
      list-style: none;
      font-size: 14px;
      vertical-align: bottom;
      span {
        margin-right: 5px;
        color: #666666;
        line-height: 20px;
      }
      p {
        margin: 0;
        padding: 0;
        width: 70%;
        display: inline-block;
        color: #333333;
        line-height: 20px;
      }
    }
  }
  //   底部按钮区域
  .footerContent {
    background-color: #fff;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 20px;
    z-index: 10000;
    .footer {
      width: 100%;
      height: 6vh;
      padding: 10px;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      button {
        width: 20vw;
      }
    }
  }
}
//  弹窗占屏幕百分比
:deep(.van-action-sheet) {
  height: 50%;
  max-height: 70%;
}
// 弹窗标题样式
:deep(.van-action-sheet__header) {
  text-align: center;
  margin-top: 0px;
  border-bottom: 1px solid #e8e8e8;
  color: #333333;
  font-size: 16px;
}
:deep(.van-divider) {
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
