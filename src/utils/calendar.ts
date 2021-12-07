import dayjs from 'dayjs'

// 初始化当前日期的月份并填充到日期格子 35个格子
export const fillCalendarDatas = (date: Date) => {
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

const getMonthTime = (time: Date) => {
  let currentDay = new Date(time)
  let currentFullYear = currentDay.getFullYear()
  let currentMonth = currentDay.getMonth()
  return {
    startDay: new Date(currentDay.setDate(1)),
    endDay: new Date(new Date(currentFullYear, currentMonth + 1, 0))
  }
}

const beforeMonthLastDay = (date: Date) => {
  return dayjs(dayjs(date).add(-1, 'month').format('YYYY-MM-DD')).daysInMonth()
}
