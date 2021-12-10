import request from '../utils/request'

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
