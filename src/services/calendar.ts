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

/**
 * 搜索同事
 */
export async function fetchFindPersonByAuth(params: any) {
  return request('/v1/department/findUser', {
    method: 'POST',
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

type lastFollowInfoParams = {
  id: string
  mobile: string
  unionId: string
  serviceProject: string
  userId: string
}
/**
 * 获取上次跟进信息（日历使用）
 */
export async function fetchCustomerLastFollowInfo(
  params: lastFollowInfoParams
) {
  return request(
    `/v1/followUp/customer/process/lastFollowInfo?eventId=${params.id}&mobile=${params.mobile}&unionId=${params.unionId}&userId=${params.userId}&serviceProject=${params.serviceProject}`
  )
}

/**
 * 获取理财师个人信息
 */
export async function fetchUserInfo(params: any) {
  return request('/v1/user/handle/info', {
    method: 'post',
    data: params
  })
}

/**
 * 打开PC页面
 */
export async function fetchTrainProLogin(params: any) {
  return request(`/v1/customerInfo/trainProLogin`, {
    method: 'POST',
    data: params
  })
}
