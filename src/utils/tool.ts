import dayjs from 'dayjs'

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach((item) => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

// 截取字符串
export const sliceStr = (str: any, sliceLen: number) => {
  if (!str) {
    return ''
  }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
  let buf: any
  if (jsonObj instanceof Array) {
    buf = []
    let i = jsonObj.length
    while (i--) {
      buf[i] = objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (let k in jsonObj) {
      buf[k] = objClone(jsonObj[k])
    }
    return buf
  } else {
    return jsonObj
  }
}

// 文件大小单位自适应转换到KB,MB,GB
export const formatFileSize = (fileSize: number) => {
  if (fileSize < 1024) {
    return `${fileSize}B`
  }
  if (fileSize < 1024 * 1024) {
    const temp = (fileSize / 1024).toFixed(2)
    return `${temp}K`
  }
  if (fileSize < 1024 * 1024 * 1024) {
    const temp = (fileSize / (1024 * 1024)).toFixed(2)
    return `${temp}M`
  }
  return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)}G`
}

// 是否企微环境
export const isOnlyWxwork = () => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) && ua.match(/wxwork/i)) {
    return true
  }
  return false
}

// 格式化时间
export const formater = (time: number) => {
  return dayjs(time * 1000).format('HH:mm')
}
