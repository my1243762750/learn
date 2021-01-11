var oproto = Object.prototype;
var serialize = oproto.toString;

var Rxports = {
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike: function (obj) {
		if (!obj)
			return false
		var n = obj.length
		if (n === (n >>> 0)) { //检测length属性是否为非负整数
			var type = serialize.call(obj).slice(8, -1)
			if (/(?:regexp|string|function|window|global)$/i.test(type))
				return false
			if (type === "Array")
				return true
			try {
				if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
					return /^\s?function/.test(obj.item || obj.callee)
				}
				return true
			} catch (e) { //IE的NodeList直接抛错
				return !obj.window //IE6-8 window
			}
		}
		return false
	},
	browser:(function() {
        //获取移动终端浏览器版本信息
        var versions = {}
        var u = navigator.userAgent,
            app = navigator.appVersion;
            versions.trident = u.indexOf('Trident') > -1, //IE内核
                versions.presto = u.indexOf('Presto') > -1, //opera内核
                versions.webKit = u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                versions.gecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                versions.mobile = !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                versions.ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //IOS终端
                versions.android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //Android终端或者UC浏览器
                versions.iPhone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
                versions.iPad = u.indexOf('iPad') > -1, //是否iPad
                versions.webApp = u.indexOf('Safari') == -1, //是否web应该程序,没有头部与底部
                versions.wechat = u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', // 是否是微信
                versions.pad = (!!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/)) && window.screen.width >= 600, //是否是pad
        // 获取语言信息
        versions.language = (navigator.browserLanguage || navigator.language).toLowerCase();
        return versions;
	})(),
	isWX : navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
	isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
	isIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
	each: function (obj, fn) {
		var That = this;
		if (obj) { //排除null, undefined
			var i = 0
			if (That.isArrayLike(obj)) {
				for (var n = obj.length; i < n; i++) {
					if (fn(i, obj[i]) === false)
						break
				}
			} else {
				for (i in obj) {
					if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
						break
					}
				}
			}
		}
	},
	/**
	 * 获取url传过来的参数
	 * @param name 	获取的参数
	 * @param Url 		自定义获取参数的链接
	 * @param return
	 */
	getUrlQuery: function (name, Url) {
		//URL GET 获取值
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		let Url_ = (Url ? Url.substr(Url.indexOf("?"), Url.lenght) : "").replace("#", "");
		let url = Url_ || window.location.search;
		let r = url.substr(1).match(reg);
		if (Rxports.browser.ios && r != null) {
			return unescape(unescape(r[2]));
		}
		if (r != null) return unescape(r[2]);
			return "";
	},

	/**
	 *   解决ios单页不能更新title
	 **/
	changeTitle: function (title) {
		var body = document.body;
		document.title = title;
		var iframe = document.createElement("iframe");
		iframe.style.display = 'none';
		iframe.addEventListener('load', function () {
			setTimeout(function () {
				iframe.removeEventListener('load', function () {}, false);
				body.removeChild(iframe);
			}, 0);
		}, false);
		body.appendChild(iframe);
	},
	/**
	 *   设置滑动高
	 **/
	setScrollHeight: function (disDivId, bottomHeight) {
		if (typeof (bottomHeight) == "undefined") {
			bottomHeight = 12; //12为1个字符的高度,若样式改变需调整
		} else {
			if (bottomHeight.toString().indexOf('rem') > 0) {
				var rootPX = $('html').css('font-size').substr(0, $('html').css('font-size').indexOf('px'));
				bottomHeight = rootPX * bottomHeight.substr(0, bottomHeight.indexOf('rem'));
			}
		}

		var contentHeight = document.body.offsetHeight;
		var documentid = document.getElementById('page_list')
		var headHeight = documentid.offsetTop;

		documentid.style.height = (contentHeight - headHeight - bottomHeight) + "px";
		documentid.style['overflow-y'] = "auto";
		documentid.style['overflow-x'] = "hidden";
	},
	storage: {
		setLocal(key, value) {
			localStorage.setItem(key, JSON.stringify(value));
		},
		getLocal(key) {
			try {
				return JSON.parse(localStorage.getItem(key))
			} catch (e) {
				return null
			}
		},
		removeLocal(key) {
			localStorage.removeItem(key);
		},
		setSession(key, value) {
			sessionStorage.setItem(key, JSON.stringify(value));
		},
		getSession(key) {
			try {
				return JSON.parse(sessionStorage.getItem(key))
			} catch (e) {
				return null
			}
		},
		removeSession(key) {
			sessionStorage.removeItem(key);
		}
	},
	encodeUnicode(str) {
		if(!str)
			return ""

		var res = [];
		for ( var i=0; i<str.length; i++ ) {
		res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
		}
		return "\\u" + res.join("\\u");
	},
	decodeUnicode(str) {
		if(!str)
			return ""
		// 解码
		str = str.replace(/\\/g, "%");
		return unescape(str);
	},
	//微信返回控制
    //指定历史返回按钮返回到指定页面
    setBack (url) {
    	let _nowURL = window.location.href;
    		setTimeout(()=>{
	            window.history.pushState("", '', url);
	            window.history.pushState("", '', _nowURL);
	            window.addEventListener("popstate", ()=>{
	            	 window.location.replace(window.location.href);
	            });
            },500)
    },
    //屏蔽历史返回按钮，效果为点击没反应
    setBackSelfe() {
    	 let _nowURL = window.location.href;
    	setTimeout(()=>{
            window.history.pushState("", '', _nowURL);
            window.addEventListener("popstate", ()=>{
            	 window.history.pushState("", '', window.location.href)
            });
          },500)
    },
    //关闭微信viwe页面
    setcloseWindow(){
    	let _nowURL = window.location.href;
    	setTimeout(()=>{
	        window.history.pushState("", '', _nowURL);
	        window.addEventListener("popstate", ()=>{
	        	wx.closeWindow();
	        });
	    },500)
    },
    //js 继承 类似jq $.extend
    extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			targetType = typeof target,
			toString = Object.prototype.toString,
			i = 1,
			length = arguments.length,
			deep = false;

		// 处理深拷贝
		if (targetType === 'boolean') {
			deep = target;

			// Skip the boolean and the target
			target = arguments[i] || {};
			targetType = typeof target;
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (targetType !== 'object' && targetType !== 'function') {
			target = {};
		}

		// 如果到此没有更多参数，则表示将 target 扩展给当前函数的持有者
		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {

			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {

				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// 防止死循环
					if (target === copy) {
						continue;
					}

					// 深拷贝对象或者数组
					if (deep && copy &&
						(copyIsArray = toString.call(copy) === '[object Array]') ||
						(toString.call(copy) === '[object Object]')) {

						if (copyIsArray) {
							copyIsArray = false;
							src = src && (toString.call(src) === '[object Array]') ? src : [];

						} else {
							src = src && (toString.call(src) === '[object Object]') ? src : {};
						}

						target[name] = extend(deep, src, copy);


					} else if (copy !== undefined) { // 仅忽略未定义的值
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},
  limitNumber(txt, num){
    var str = txt;
    if(str.length > num){
      str = str.substr(0, num) + '...' ;
      if(this.isEmojiCharacter(str.substring(4, 6))){
        str = str.substring(0, num-1) + '...' ;
      }
      if(this.isEmojiCharacter(str.substring(5, 7))){
        str = str.substring(0, num+1) + '...' ;
      }
    }
    return str;
  },
  isEmojiCharacter(substring) {
    for ( var i = 0; i < substring.length; i++) {
      var hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          var ls = substring.charCodeAt(i + 1);
          var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true;
          }
        }
      } else if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          return true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          return true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          return true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          return true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
          || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
          || hs == 0x2b50) {
          return true;
        }
      }
    }
  },
	isMobilePhone(number){
		return /((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/.test(number);
	},
	isPassPhone(number) {
	    return /1\d{10}$/.test(number);
	},
	isEmail(email){
		return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
	},
};

export default Rxports



// WEBPACK FOOTER //
// ./src/assets/js/common.js