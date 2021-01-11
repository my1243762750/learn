(function (window, document, undefined) {
    'use strict';

    function MyString() {

    }

    //判断字符串是否包含某个字符串
    MyString.prototype.fnIsContainerStr = function (oriStr, checkStr) {
        // return oriStr.toUpperCase().indexOf(checkStr.toUpperCase()) >= 0;
        return new RegExp(checkStr, 'i').test(oriStr);
    };
    //判断一个对象是否为数组
    MyString.prototype.fnIsArray = function (array) {
        return Object.prototype.toString().call(array) === '[object Array]';
    };
    //判断一个对象是否为数字(10进制数字)
    MyString.prototype.fnIsNumber = function (num) {
        return /^-?\d+(\.\d+)?$/.test(num);
    };
    //十六进制颜色转换RGB
    MyString.prototype.fnToRGB = function (color) {
        var str = "";
        var result = [];
        var reg = /^#[0-9a-zA-Z]{3}$/;
        if (color === "invalid") {
            return "invalid";
        }
        if (reg.test(color)) {
            return color;
        }
        else {
            for (var i = 1; i <= 6; i = i + 2) {
                str = color.substr(i, 2);
                var ss = parseInt(str, 16);
                result.push(ss);
            }
        }
        result = 'rgb(' + result.join(',') + ')';
        return result;
    };
    //js获取url参数（区分大小写）
    MyString.prototype.getUrlParam = function (paramName) {
        var obj = {};
        var search = window.location.search;
        var paramArr = null;
        if (!search) {
            return paramArr;
        }
        paramArr = decodeURI(search).substring(1).split('&');
        for (var i = 0, max = paramArr.length, item = []; i < max; i++) {
            item = paramArr[i].split('=');
            obj[item[0]] = item[1];
        }
        return obj[paramName];
    };
    //js获取url参数(正则表达式法)（不区分大小写）
    MyString.prototype.getUrlParamByReg = function (paramName) {
        var paramStr = window.location.search.substring(1);
        var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i');
        var result = paramStr.match(reg);
        if (result) {
            return decodeURI(result[2]);
        }
        return null;
    }
}(window, document));