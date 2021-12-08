import dayjs from 'dayjs'

// 初始化当前日期的月份并填充到日期格子
export const fillMonthCalendarDatas = (date: Date) => {
  let _daysInMonth = dayjs(date).daysInMonth(),
    _firstAndLastDay = getMonthTime(date),
    _beforeMonthLastDay = beforeMonthLastDay(date),
    thisMonth = dayjs(date).month() + 1,
    _lastMonthMonth = dayjs(date).month() === 11 ? 1 : dayjs(date).month() + 2,
    beforeLength = dayjs(_firstAndLastDay.startDay).day(),
    afterLength = 6 - dayjs(_firstAndLastDay.endDay).day(),
    beforeDates = [],
    afterDates = [],
    days = []
  for (
    let i = _beforeMonthLastDay - beforeLength + 1;
    i <= _beforeMonthLastDay;
    i++
  ) {
    beforeDates.push({
      day: i,
      type: 'before',
      nickDay: i
    })
  }
  for (let i = 1; i <= _daysInMonth; i++) {
    if (i === 1) {
      days.push({
        day: i,
        type: 'normal',
        nickDay: i,
        show: thisMonth + '月'
      })
    } else {
      days.push({
        day: i,
        type: 'normal',
        nickDay: i
      })
    }
  }
  for (let i = 1; i <= afterLength; i++) {
    afterDates.push({
      day: i,
      type: 'after',
      nickDay: i
    })
  }
  console.log(beforeDates.concat(days).concat(afterDates))

  return beforeDates.concat(days).concat(afterDates)
}

// 获取当前日期月份的开始日期和结束日期
const getMonthTime = (time: Date) => {
  let currentDay = new Date(time)
  let currentFullYear = currentDay.getFullYear()
  let currentMonth = currentDay.getMonth()
  return {
    startDay: new Date(currentDay.setDate(1)),
    endDay: new Date(new Date(currentFullYear, currentMonth + 1, 0))
  }
}

// 前面月份的最后一天
const beforeMonthLastDay = (date: Date) => {
  return dayjs(dayjs(date).add(-1, 'month').format('YYYY-MM-DD')).daysInMonth()
}

// 初始化当前日期的两周并初始化到格子里面
export const fillWeekCalendarDatas = (date: Date) => {}

// 以当前时间为基准获取前后一年的日期数据
export const fillCalendarDatas = (date: Date) => {
  const currentDay = dayjs(date).day() // 当前日期周几
  const firstDayInWeek = dayjs(date).add(6 - currentDay, 'day')
  const startDay = dayjs(firstDayInWeek.format('YYYY-MM-DD')).add(-420, 'day')
  return getAllDateCN(startDay, firstDayInWeek)
}

function getAllDateCN(startTime: any, endTime: any) {
  var date_all: any[] = []
  var i = 0
  while (endTime - startTime >= 0) {
    var year = startTime.year()
    var month = startTime.month() + 1
    var day = startTime.date()
    date_all[i] = {
      dateString: year + '年' + month + '月' + day + '日',
      value: i > 1 && month !== date_all[i - 1].month ? month + '月' : day,
      date: startTime.valueOf(),
      month
    }
    startTime = startTime.add(1, 'day')
    i += 1
  }
  return date_all
}
