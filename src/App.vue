<script lang="ts">
import TabBar from './components/TabBar'
import { fetchToken, fetchAgentTicket } from '@/services/auth'
export default {
  components: {
    TabBar
  },
  setup() {
    // 授权配置
    const authConfig = async () => {
      // 授权配置
      const [config, agentConfig]: [any, any] = await Promise.all([
        fetchToken(),
        fetchAgentTicket()
      ])
      const setting = {
        corpid: 'ww0503560e67e7f9e6',
        agentid: '1000011',
        jsApiList: [
          'selectExternalContact',
          'openUserProfile',
          'getCurExternalContact',
          'sendChatMessage',
          'playVoice',
          'downloadVoice',
          'openDefaultBrowser',
          'onMenuShareAppMessage',
          'onMenuShareWechat',
          'getCurExternalChat',
          'openEnterpriseChat',
          'navigateToAddCustomer', // 进入添加客户界面
          'openUserProfile', // 打开个人信息页面
          'shareAppMessage' // 自定义转发到会话
        ]
      }

      console.log('config: =================>', config)
      console.log('agentConfig: ===============>', agentConfig)

      window.wx.config({
        beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
        debug: false, // 开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端开发，参数信息会通过log打出，仅在pc端时才会打印。
        appId: setting.corpid, // 必填，企业微信的corpID
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature: config.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
        jsApiList: setting.jsApiList // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
      })

      window.wx.ready(() => {
        window.wx.agentConfig({
          corpid: setting.corpid, // 必填，企业微信的corpid，必须与当前登录的企业一致
          agentid: setting.agentid, // 必填，企业微信的[应用id](##14953#agentid)
          timestamp: agentConfig.timestamp, // 必填，生成签名的时间戳
          nonceStr: agentConfig.nonceStr, // 必填，生成签名的随机串
          signature: agentConfig.signature, // 必填，签名，见附录1
          jsApiList: setting.jsApiList, //必填
          fail: () => {
            console.log('configAgent初始化失败')
          },
          success: () => {
            console.log('成功配置configAgent')
          }
        })
      })
    }

    authConfig()
  }
}
</script>

<template>
  <div>
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<style scope></style>
