(function (window, document, undefined) {
    'use strict';

    function MyCookie() {

    }

    MyCookie.prototype.setCookie = function (name, value, date) {
        var cookie = name + '=' + value;
        date = date || new Date();
        document.cookie = cookie + ';expires=' + date;
    };
    MyCookie.prototype.getCookie = function (name) {
        var cookieArr = document.cookie.split(';'),
            i = 0,
            cookie = '';
        name = name + '=';
        for (i = 0; i < cookieArr.length; i++) {
            cookie = cookieArr[i];
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length,cookie.length);
            }
        }
    };

    window.myCookie = new MyCookie();
}(window, document));