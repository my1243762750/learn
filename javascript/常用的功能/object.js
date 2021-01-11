(function (window) {
  'use strict';

  function MyObject() {
  }

  MyObject.prototype.isEmpty = function (obj) {
    for (var key in obj) {
      return false;
    }
    return true;
  };
  MyObject.prototype.deepCopy = function (sourceObj, originObj) {
    // 方式一
    // sourceObj = JSON.parse(JSON.stringify(originObj));
    // return sourceObj;
    // 方式二
    var i;
    if (!sourceObj) {
      sourceObj = originObj.constructor === Array ? [] : {};
    }
    if (originObj && (typeof originObj === 'object')) {
      for (i in originObj) {
        sourceObj[i] = this.deepCopy(sourceObj[i], originObj[i]);
      }
    } else {
      sourceObj = originObj;
    }
    return sourceObj;
  };
  MyObject.prototype.extend = function () {
    var isDeep = arguments[0];
    var firstParamIsBoolean = (typeof isDeep) === 'boolean';
    var start = firstParamIsBoolean ? 2 : 1;
    for (var i = start, max = arguments.length; i < max; i++) {
      this.deepCopy(arguments[start], arguments[i]);
    }
    return arguments[start];
  };

  /**
   * 生成n~m的随机数
   * @param minNum
   * @param maxNum
   * @returns {number}
   */
  MyObject.prototype.randomNum = function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  };

  /**
   * 判断一个数是否为数字
   * @param number
   * @returns {boolean}
   */
  MyObject.prototype.isNumber = function (number) {
    return /^-?\d+(\.\d+)?$/.test(number)
  };

  /**
   * 将时间序列转换成日期
   * @param time
   * @param delimiter
   * @returns {*}
   */
  MyObject.prototype.filterDate = function (time, delimiter) {
    time = new Date(time)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    return y + delimiter + m + delimiter + d
  };

  /**
   * 金钱过滤器
   * @param number
   * @param fit
   * @returns {string}
   */
  MyObject.prototype.moneyFilter = function (number, fit) {
    fit = fit || 2
    if (!/^-?\d+(\.\d+)?$/.test(number)) {
      return '-'
    } else {
      return '￥' + (+number).toFixed(fit)
    }
  };

  /**
   * 非数字过滤
   * @param obj
   * @param key
   * @returns {*}
   */
  MyObject.prototype.numberFilter = function (obj, key) {
    const number = obj[key]
    if (!/^-?\d+(\.\d+)?$/.test(number)) {
      obj[key] = ''
    }
    return obj[key]
  };

  /**
   * 将时间序列转换成日期时间
   * @param time
   * @param delimiterDate
   * @param delimiterTime
   * @returns {string}
   */
  MyObject.prototype.filterDateTime = function (time, delimiterDate, delimiterTime) {
    time = new Date(time)
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return year + delimiterDate + month + delimiterDate + day + ' ' + hour + delimiterTime + minute + delimiterTime + second
  };

  /**
   * 查找数组中是否存在某个对象
   * @param arr
   * @param obj
   * @param isAll 数组arr的某个对象包含/全等obj. 1.true 全等 2.false 包含，默认为fale
   * @returns {boolean}
   */
  MyObject.prototype.checkObjIsExist = function (arr, obj, isAll) {
    arr = arr.map((item) => {
      return Object.assign({}, obj, item)
    })
    return !!arr.find((item) => {
      if (isAll) {
        return JSON.stringify(item) === JSON.stringify(obj)
      } else {
        const tempItem = JSON.stringify(item)
        const tempObj = JSON.stringify(obj).replace(/\{|\}/g, '')
        return tempItem.indexOf(tempObj) > -1
      }
    })
  };
  /**
   * 数组去重复
   */
  MyObject.prototype.moveRepeatItem = function (arr) {
    const currentArr = JSON.parse(JSON.stringify(arr))
    const strArr = currentArr.map((item) => {
      const temp = {
        memberId: '',
        memberName: ''
      }
      return JSON.stringify(Object.assign(temp, item))
    })
    const filterArr = [...(new Set(strArr))]
    return filterArr.map((item) => {
      return JSON.parse(item)
    })
  };

  MyObject.prototype.fileDownload = function (url) {
    const xhr = new XMLHttpRequest();
    xhr.open('post', url);
    xhr.onprogress = function (event) {
      console.log(Math.round(event.loaded) / event.total * 100 + '%');
    };
    xhr.responseType = 'arraybuffer';
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === '200') {
        // 获取响应头主要获取附件名称
        const contentDisposition = xhr.getResponseHeader('content-disposition');
        // 获取类型和编码
        const contentType = xhr.getResponseHeader('Content-Type');
        // 构造blob对象
        const blob = new Blob([xhr.response], {
          type: contentType
        });
        const url = window.URL.createObjectURL(blob);
        // 获取文件名
        const regex = /filename=[^;]*/;
        const matchs = contentDisposition.match(regex);
        let filename = '';
        if (matchs) {
          filename = decodeURIComponent(match[0].split('=')[1]);
        } else {
          filename = Date.now() + '.doc';
        }
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    }
  };

  MyObject.prototype.thousandSeparator = function (num) {
    if ((!num && num !== 0) || num === '--') return '--'
    let val = num + ''
    let separator = ''
    if (val.indexOf('%') > -1) {
      val = val.split('%')[0]
      separator = '%'
    }
    if (typeof (+val) === 'number') {
      return (val).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + separator
    } else {
      return '--'
    }
  }

  window.myObject = new MyObject();
}(window, document));
