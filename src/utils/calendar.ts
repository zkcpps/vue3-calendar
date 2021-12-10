import dayjs from 'dayjs'

// 日期添加天数
export const addDayByDayjs = (date: any, days: number) => {
  return dayjs(date).add(days, 'day')
}

// 以当前时间为基准获取前后一年的日期数据
export const fillCalendarDatas = (date: Date, fetchDatas: any) => {
  const currentDay = dayjs(date).day() // 当前日期周几
  const firstDayInWeek = dayjs(date).add(7 - currentDay, 'day')
  const startDay = addDayByDayjs(firstDayInWeek.format('YYYY-MM-DD'), -420)
  const endDay = addDayByDayjs(firstDayInWeek.format('YYYY-MM-DD'), 420)
  const datas = getAllDateCN(startDay, firstDayInWeek).concat(
    getAllDateCN(firstDayInWeek, endDay).slice(1)
  )
  if (fetchDatas) {
    let start = 0 // 记录第二层循环开始位置
    for (let i = 0; i < datas.length; i++) {
      for (let j = start; j < fetchDatas.length; j++) {
        if (datas[i].dateString === fetchDatas[j].date) {
          datas[i].status = currentDayStatus(fetchDatas[j])
          start = j
          break
        }
      }
    }
  }
  return datas
}

// 判断当天完成状态 1: 完成 2: 未完成 3没有跟进事件
function currentDayStatus(data: any) {
  if (data.total && data.contacted && data.contacted === data.total) {
    //完场状态
    return 1
  } else if (data.total && data.contacted !== 0) {
    return 2
  } else {
    return 3
  }
}

function getAllDateCN(startTime: any, endTime: any) {
  var date_all: any[] = []
  var i = 0
  while (endTime - startTime >= 0) {
    var month = startTime.month() + 1
    var day = startTime.date()
    date_all[i] = {
      dateString: dayjs(startTime).format('YYYYMMDD'),
      value: i > 1 && month !== date_all[i - 1].month ? month + '月' : day,
      date: startTime.valueOf(),
      month
    }
    startTime = startTime.add(1, 'day')
    i += 1
  }
  return date_all
}

// 获取当天的开始时间和结束时间戳
export const getFirstAndLastTimes = (date: any) => {
  const nextDay = dayjs(date).add(1, 'day').format('YYYY-MM-DD')
  return {
    start: new Date(new Date(date).toLocaleDateString()).getTime() / 1000,
    end: new Date(new Date(nextDay).toLocaleDateString()).getTime() / 1000
  }
}
