import request from '../utils/request';

/**
 * 获取理财师日历事件
 */
 export async function fetchCalEventsGetCalEvents(params: any) {
  return request('/v1/calEvents/getCalEvents', {
    method: 'post',
    data: params
  })
}