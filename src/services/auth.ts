import request from '@/utils/request'
/**
 * 授权获取token
 */
export async function fetchToken() {
  return request(
    `https://blue.planplus.cn/bluemate/v1/api/weixin/getToken/xiaolantongxue?uri=${encodeURIComponent(
      window.location.href.split('#')[0]
    )}`
  )
}

/**
 * 授权获取签名
 */
export async function fetchAgentTicket() {
  return request(
    `https://blue.planplus.cn/bluemate/v1/api/weixin/getAgentTicket/xiaolantongxue?uri=${encodeURIComponent(
      window.location.href.split('#')[0]
    )}`
  )
}
