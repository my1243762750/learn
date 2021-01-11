/**
 * Created by Shinelon on 2016/10/10.
 */
(function (window, document, undefined) {
    'use strict';
    var _easyAjax = function (config) {
        var xhr = null;
        try {
            xhr = new ActiveXObject("Microsoft.xmlhttp");
        } catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            } catch (e2) {
                alert("您的浏览器不支持ajax");
            }
        }
        xhr.open(params.method, params.url, params.async);
        if (params.method.toLocaleUpperCase() === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/json');
            params.data = JSON.stringify(params.data);
        }
        xhr.onload = function () {
            params.success && params.success(JSON.parse(this.responseText));
        };
        xhr.send(params.data);
    };
    window.easyAjax = _easyAjax;
}(window, document));
