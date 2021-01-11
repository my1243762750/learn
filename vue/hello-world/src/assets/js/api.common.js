/*create By_lxyea*/
/*create Date 2017-09-19*/

import axios from 'axios';
import Qs from 'qs';
require('es6-promise').polyfill();

//网络异常提示
let _errorResult = {
  "errorCode": "NETERROR",
  "errorMessage": "获取失败，请检查网络",
  "result": null,
  "succeeded": false
};

let _serviceUrl = process.env.service_url;

//配置axios使用data传参数
let instance = axios.create({
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    /*改了这里*/
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      let _data = Object.keys(data)
      return encodeURI(_data.map(name => `${name}=${data[name]}`).join('&'));
    }
    return data;
  }],
})

//封装axios，减少学习成本，参数基本跟jq ajax一致
let _axios = {
  /**
   * 封装axios，减少学习成本，参数基本跟jq ajax一致
   * @param {String} type			请求的类型，默认post
   * @param {String} url				请求地址
   * @param {String} time			超时时间
   * @param {Object} data			请求参数
   * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
   * @param {Object} headers			自定义请求headers
   * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
   * @param {Function} error		发送请求前
   * @param return
   */
  ajax: function (opt) {
    var opts = opt || {};
    if (!opts.url) {
      alert('请填写接口地址');
      return false;
    }
    axios({
      method: opts.method || 'POST',
      url: _serviceUrl + opts.url + "?t=" + new Date().getTime(),
      //直接请求后台，使用下方注释，只适用在开发环境下，QA服务器上不可用
      // params: opts.data,
      //通过访问中转项目，适用在外网环境中访问weblogic，如QA，PD
      data: {
        "para": opts.data,
        "service": opts.url,
      },
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify({
          para: Qs.stringify(data.para),
          service: data.service,
        })
      }],
      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
      timeout: opts.time || 60 * 1000,
      responseType: opts.dataType || 'json'
    }).then(function (res) {
      if (res.status == 200) {
        if (opts.success) {
          opts.success(res.data, res);
        }
      } else {
        if (data.error) {
          opts.error(data.error)
          //opts.error(error);
        } else {
          opts.error(_errorResult)
        }
      }
    }).catch(function (error) {
      console.log(error);
      //alert('好多人在访问呀，请重新试试[timeout]');
      opts.error(_errorResult)

    });

  }
}

let _interface = {
  "queryWallet": "wallethome/queryWallet", //首页信息
  "orderDate": "wallethome/orderDate", //新的订单
  "redirectOrder": "wallethome/redirectOrder", //云购订单
  "redirectProduct": "wallethome/redirectProduct", //微购产品
  "getOrderDetail": "order/getOrderDetail", //佣金明细
  "getBindAccount": "paymentAccountManage/getBindAccount", //获取绑定的账户
  "setPayFlag": "paymentAccountManage/setPayFlag", //改绑默认账户
  "cancelbind": "paymentAccountManage/cancelbind", //解绑账户
  "getAdaNames": "paymentAccountManage/getAdaNames", //获取用户名
  "bind": "paymentAccountManage/bind", //绑定账户

  "getToken": "/3ewallet/getToken", //获取微信getToken
  "getWeChatUserinfo": "/3ewallet/getWeChatUserinfo", //getWeChatUserinfo
  "getAdaUserinfo": "/3ewallet/getAdaUserinfo", //getAdaUserinfo
  "getAccessToken": "/3ewallet/getAccessToken", //getAccessToken
  "getSSoUserInfo": "logincenter/getUserInfo",
  "retrieveAdaInfo": "user/retrieveAdaInfo",
}

let _sendAjaxByGet = function (url, param, callback) {
  // console.log(Qs.stringify(param))
  axios.get(url, {
    params: {
      'service': url,
      'para': Qs.stringify(param)
    }
  }).then((result) => {
    if (typeof callback === "function") {
      callback.call(this, result.data)
    }
  }).catch((result) => {
    if (typeof callback === "function") {
      callback.call(this, result)
    }
  });
}

let _sendAjaxByPost = function (url, param, callback) {
  _axios.ajax({
    url: url,
    data: param,
    success: (result) => {
      if (typeof callback === "function") {
        callback.call(this, result)
      }
    },
    error: (result) => {
      if (typeof callback === "function") {
        callback.call(this, result)
      }
    }
  })
}

var ApiCommon = {
  interface: _interface,
  sendAjaxByPost: (url, param, callback) => {
    _sendAjaxByPost(url, param, callback);
  },
  sendAjaxByGet: (url, param, callback) => {
    _sendAjaxByGet(url, param, callback);
  },
  posServlet(url, param, callback) {
    var _url = url;
    if (param) {
      _url = _url + "?" + Qs.stringify(param);
    }
    axios.post(_url).then((response) => {
      if (typeof callback === "function") {
        callback.call(this, response.data);
      }
    }).catch((error) => {
      if (typeof callback === "function") {
        callback.call(this, error.data);
      }
    })
  },
  axios
}

export default ApiCommon



// WEBPACK FOOTER //
// ./src/assets/js/api.common.js