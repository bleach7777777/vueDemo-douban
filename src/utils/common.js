const commonJS = {
  // 深拷贝
  deepClone: function (target) {
    let result
    if (typeof target === 'object') { // 判断是否是一个对象，如果是一个对象，继续判断
      if (Array.isArray(target)) { // 判断是否是一个数组，如果是一个数组，则循环赋值
        result = []
        for (let i in target) {
          result.push(this.deepClone(target[i]))
        }
      } else if (target === null) { //  如果不是一个数组，继续判断是否为null，如果是null，则直接赋值
        result = null
      } else if (target.constructor === RegExp) { // 如果不是null，则继续判断是否为RegExp，如果是RegExp，则直接赋值
        result = target
      } else { // 如果不是RegExp，则是一个普通对象，则直接循环赋值
        result = {}
        for (let i in target) {
          result[i] = this.deepClone(target[i])
        }
      }
    } else { // 如果不是一个对象，则是普通数据类型，直接赋值
      result = target
    }
    return result
  },
  // 过滤人数
  filterPeopleNum: function (value) {
    let result = ''
    if (value > 10000) {
      result = parseFloat(value / 10000).toFixed(1) + '万'
    } else {
      result = value
    }
    return result
  },
  // 字符串格式的日期转为时间戳
  transTime: function (date) {
    let reg = /-/g
    date = date.replace(reg, '/')
    let result = new Date(date).getTime()
    return result
  }
}

export default commonJS
