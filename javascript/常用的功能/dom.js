(function (window, document, undefined) {
    'use strict';

    function MyDom() {

    }

    /**
     * js添加事件
     * @param el 事件触发对象
     * @param type 事件
     * @param handler 处理函数
     * @param useCapture 冒泡或捕获
     */
    MyDom.prototype.addEvent = function (el, type, handler, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(type, handler, useCapture);
        } else if (el.attachEvent) {
            // el.attachEvent('on' + type, handler);
            // ie没有捕获阶段，但有冒泡，而且是默认的；回调函数中的this指向window，apply是改变回调函数this指向，指向调用者
            el.attachEvent('on' + type, function () {
                handler.apply(el);
            });
        } else {
            el['on' + type] = handler;
        }
    };

    /**
     * js移出事件
     * @param el 事件触发对象
     * @param type 事件
     * @param handler 处理函数
     */
    MyDom.prototype.removeEvent = function (el, type, handler) {
        if (type.removeEventListener) {
            el.removeEventListener(type, handler);
        } else if (type.detachEvent) {
            el.detachEvent('on' + type, handler);
        } else {
            el['on' + type] = null;
        }
    };

    /**
     * 设置样式
     * @param el
     * @param styleObj
     */
    MyDom.prototype.setStyle = function (el, styleObj) {
        var styleArr = [];
        var oldInlineStyle = el.style.cssText.split(';');
        var newStyleObj = {};
        for (var i = 0, item; i < oldInlineStyle.length; i++) {
            item = oldInlineStyle[i].split(':');
            newStyleObj[item[0]] = item[1];
        }
        for (var oldKey in styleObj) {
            newStyleObj[oldKey] = styleObj[oldKey];
        }
        for (var newKey in newStyleObj) {
            styleArr.push(newKey + ':' + newStyleObj[newKey]);
        }
        el.style.cssText = styleArr.join(';');
    };

    /**
     * 获取样式
     * @param el
     * @param styleName
     * @returns {*}
     */
    MyDom.prototype.getStyle = function (el, styleName) {
        if (el.currentStyle) {
            return el.currentStyle[styleName];
        } else {
            return document.defaultView.getComputedStyle(el, null)[styleName];
        }
    };

    /**
     * 创建dom元素
     * @param el
     * @param obj
     */
    MyDom.prototype.create = function (el, obj) {
        let _this = this;
        el = el || document.body;
        obj = obj || {};
        // if (!obj.tagName) {
        //     throw 'tagName is must';
        // }
        if (obj.tagName) {
            let tag = obj.tagName && document.createElement(obj.tagName);
            // let text = obj.text && document.createTextNode(obj.text);
            obj.properties && Object.keys(obj.properties).forEach(function (key) {
                tag.setAttribute(key, obj.properties[key]);
            });
            // text && tag.appendChild(text);
            obj.text && (tag.innerHTML = obj.text);
            if (obj.childNodes && obj.childNodes.length) {
                obj.childNodes.forEach(function (value) {
                    _this.create(tag, value);
                });
            }
            el.appendChild(tag);
        } else {
            obj.text && (el.innerHTML = obj.text);
        }

    };

    window.myDom = new MyDom();
}(window, document));