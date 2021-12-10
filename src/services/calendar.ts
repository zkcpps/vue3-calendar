import request from '@/utils/request'

/**
 * 获取理财师日历事件
 */
export async function fetchCalEventsGetCalEvents(params: any) {
  return request('/v1/calEvents/getCalEvents', {
    method: 'post',
    data: params
  })
}

type customerEventsStatusParams = {
  userId: string
  eventStartTime: number
  eventEndTime: number
}
/**
 * 获取理财师客户接续情况
 */
export async function fetchCustomerEventStatus(
  params: customerEventsStatusParams
) {
  return request('/v1/calEvents/customerEventStatus', {
    method: 'post',
    data: params
  })
}
