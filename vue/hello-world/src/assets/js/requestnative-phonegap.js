var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
var isWX = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger';
import M from './common';


export const initCordova = (callback) => {
    var oHead = document.getElementsByTagName('head').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";

    if(!isWX){

        //获取路径名称
        var pathName = window.location.origin;
        //console.log(window.location.host);

        if (isIOS) {
            oScript.src = pathName + "/3ewallet/static/cordovaIos.js";
        } else if (isAndroid) {
            oScript.src = pathName + "/3ewallet/static/cordova.js";
        }
        oScript.onload = () => {
            callback();
        };
        oScript.onerror = () => {
            callback();
        };
    }
    oHead.appendChild(oScript);
};

window.phonegap =
{
    callHandler: function (successCallback, errorCallback, Para) {

        if(isIOS){
            setTimeout(function(){
                //执行命令
                cordova.exec(
                    successCallback, // 调用成功的时候的回调函数
                    errorCallback, // 调用失败的时候的回调函数
                    'PhoneGapNative', // 类名
                    'requestNative', // 动作名：这里可能想成为Command，但是考虑到之前都是写在参数中，所以暂时不进行改变
                    Para    //参数
                );
            },0);
        }else{
            //执行命令
            cordova.exec(
                successCallback, // 调用成功的时候的回调函数
                errorCallback, // 调用失败的时候的回调函数
                'PhoneGapNative', // 类名
                'requestNative', // 动作名：这里可能想成为Command，但是考虑到之前都是写在参数中，所以暂时不进行改变
                Para    //参数
            );
        }
    },
    callToast: function (msg) {
        if(isIOS){
            setTimeout(function(){
                navigator.notification.toast(msg);
            },0);
        }else{
            navigator.notification.toast(msg);
        }
    },callInside : function(url,title,callback){
        var saveParam = [{
            command: "callWEBCordova",
            para: {"url" : url,"type" : "1", "navbar" : "Y", "scroll": "Y", "title" : title}
        }];

        phonegap.callHandler(function(data){
            data = jsonObject(data);
            if(data.errcode || data.errm){
                phonegap.callToast(data.errm);
                return;
            }

            if(typeof callback !== 'undefined' && typeof callback === 'function'){
                callback.call(this, data);
            }
        }, function(data){phonegap.callToast('系统异常')}, saveParam);
    },
    CallBrowser : function(url,callback){
        var saveParam = [{
            command: "CallBrowser",
            para: {"url" : url}
        }];

        phonegap.callHandler(function(data){
            data = jsonObject(data);
            if(data.errcode || data.errm){
                phonegap.callToast(data.errm);
                return;
            }

            if(typeof callback !== 'undefined' && typeof callback === 'function'){
                callback.call(this, data);
            }
        }, function(data){}, saveParam);
    },
    wechatOAuth:function (success,error){
        var saveParam = [{
            command: "wechatOAuth",
            para:"",
        }];

        phonegap.callHandler(function(data){
            data = jsonObject(data);
            if(typeof success !== 'undefined' && typeof success === 'function'){
                success.call(this, data);
            }
        }, function(data){
            data = jsonObject(data);
            if (typeof error !== 'undefined' && typeof error === 'function') {
              error.call(this, data);
            }
        }, saveParam);
    },
    changeToWeixin:function (success,error){
        var saveParam = [{
            command: "changeToWeixin",
            para:"",
        }];

        phonegap.callHandler(function(data){
            data = jsonObject(data);
            if(typeof success !== 'undefined' && typeof success === 'function'){
                success.call(this, data);
            }
        }, function(data){
            data = jsonObject(data);
            if (typeof error !== 'undefined' && typeof error === 'function') {
              error.call(this, data);
            }
        }, saveParam);
    },
    getHubServiceInfo: function (success, error) {
        var saveParam = [{
          command: "GetUserInfo",
          para: "",
        }];

        phonegap.callHandler(function (data) {
          data = jsonObject(data);
          if (typeof success !== 'undefined' && typeof success === 'function') {
            success.call(this, data);
          }
        }, function (data) {
          data = jsonObject(data);
          if (typeof error !== 'undefined' && typeof error === 'function') {
            error.call(this, data);
          }
        }, saveParam);
    },
    // backToParentPageByNative:function(){
    //   phonegap.callHandler(successFun, failFun, [{
    //     "command": "backAction",
    //     "para": null
    //   }]);
    // }
    backToParentPageByNative:function(){
        if (M.getUrlQuery('url')) {
            location.href = decodeURIComponent(M.getUrlQuery('url'));
        } else {
            phonegap.callHandler(successFun, failFun, [{
              "command": "backDesktop",
              "para": ""
            }]);
        }
    }
};

/*
 * 定义成功调用一个空方法
 */
function successFun() { }

/*
 * 失败的时候的共有方法
 */
function failFun(data) {
    // alert(data);
    // phonegap.callToast(data);
}

/*
 * 设置phoneGap初始化的处理
 */
const deviceReady = (fun) => {

    var readyEvent = function () {
        if (isAndroid)
            document.addEventListener("resume", fun, false);

        fun.call(this);
    }

    //当设备准备完毕的时候初始化数据
    document.addEventListener("deviceready", readyEvent, false);
    //fun.call(this);
};
window.deviceReady = deviceReady;
/*
 * 返回的数据是否是Json对象
 */
const jsonObject = (obj) => {
  var jsonObj;

  if (typeof (obj) === "string") {
    jsonObj = eval("(" + obj + ")");
  } else {
    jsonObj = obj;
  }

  return jsonObj;
};
window.jsonObject = jsonObject;



// WEBPACK FOOTER //
// ./src/assets/js/requestnative-phonegap.js