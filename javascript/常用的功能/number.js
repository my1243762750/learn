(function (window, document, undefined) {
  'use strict';

  function MyNumber() {
  }

  MyNumber.prototype.percentToPint = function (percent) {
    return percent.replace('%', '') / 100;
  };
  MyNumber.prototype.pintToPercent = function (pint) {
    return pint * 100 + '%';
  };
  /**
   * 四舍五入
   * @param value
   * @returns {any}
   */
  MyNumber.prototype.toFixed = function (s) {
    let originValue = this
    let value = Math.abs(this)
    let changenum = (parseInt(value * Math.pow(10, s) + 0.5) / Math.pow(10, s)).toString();
    let index = changenum.indexOf(".");
    if (index < 0 && s > 0) {
      changenum = changenum + ".";
      for (let i = 0; i < s; i++) {
        changenum = changenum + "0";
      }
    } else {
      index = changenum.length - index;
      for (let i = 0; i < (s - index) + 1; i++) {
        changenum = changenum + "0";
      }
    }
    return originValue > 0 ? changenum : '-' + changenum;
  };
  /**
   * 不四舍五入保留位数
   * @param stringNumber 字符串数字
   * @param bit 保留位数
   * @returns {*}
   */
  MyNumber.prototype.toFixedNoRound = function (stringNumber, bit) {
    var _number = '';
    // 补充0
    var _addZero = function (stringNumber, length) {
      for (var i = 0; i < length; i++) {
        stringNumber += '0';
      }
      return stringNumber;
    };
    if (stringNumber !== 0 && !stringNumber) {
      return null;
    } else if (!isNaN(stringNumber)) {
      stringNumber = stringNumber + '';
      var isRadixPoint = stringNumber.indexOf('.') > -1;
      if (isRadixPoint) {//有小数点
        var arr = stringNumber.split('.');
        var integerPart = arr[0];
        var radixPart = arr[1];
        var radixPartLength = radixPart.length;
        if (radixPartLength > bit) {//数字本身的小数位数超过保留位
          radixPart = radixPart.substring(0, bit);
        } else {//数字本身的小数位数超过保留位
          radixPart = _addZero(radixPart, bit - radixPartLength);
        }
        _number = integerPart + '.' + radixPart;
      } else {//没有小数点
        _number = stringNumber + '.' + _addZero('', bit);
      }
    }
    return _number;
  };
  window.myNumber = new MyNumber();
}(window, document));
