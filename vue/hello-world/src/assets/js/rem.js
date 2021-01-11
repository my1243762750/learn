// 方案一
// (function(doc, win) {
//   var docEl = doc.documentElement,
//     resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     recalc = function() {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//     };
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
//   doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window);


// 方案二
!function (i, e) {
  var t, a = i.document, r = a.documentElement, n = a.querySelector('meta[name="viewport"]'),
    o = a.querySelector('meta[name="flexible"]'), l = 0, m = 0, d = e.flexible || (e.flexible = {});
  if (n) {
    var s = n.getAttribute("content").match(/initial\-scale=([\d\.]+)/);
    s && (m = parseFloat(s[1]), l = parseInt(1 / m))
  } else if (o) {
    var p = o.getAttribute("content");
    if (p) {
      var c = p.match(/initial\-dpr=([\d\.]+)/), u = p.match(/maximum\-dpr=([\d\.]+)/);
      c && (l = parseFloat(c[1]), m = parseFloat((1 / l).toFixed(2))), u && (l = parseFloat(u[1]), m = parseFloat((1 / l).toFixed(2)))
    }
  }
  if (!l && !m) {
    i.navigator.appVersion.match(/android/gi);
    var f = i.navigator.appVersion.match(/iphone/gi), v = i.devicePixelRatio;
    l = f ? 3 <= v && (!l || 3 <= l) ? 3 : 2 <= v && (!l || 2 <= l) ? 2 : 1 : 1, m = 1
  }
  if (r.setAttribute("data-dpr", l), !n) if ((n = a.createElement("meta")).setAttribute("name", "viewport"), n.setAttribute("content", "initial-scale=" + m + ", maximum-scale=" + m + ", minimum-scale=" + m + ", user-scalable=no"), r.firstElementChild) r.firstElementChild.appendChild(n); else {
    var h = a.createElement("div");
    h.appendChild(n), a.write(h.innerHTML)
  }

  function x() {
    var e = r.getBoundingClientRect().width;
    750 < e / l && (e = 750 * l);
    var t = e / 3.75;
    r.style.fontSize = (140 < t ? 140 : t) + "px", d.rem = i.rem = t
  }

  i.addEventListener("resize", function () {
    clearTimeout(t), t = setTimeout(x, 300)
  }, !1), i.addEventListener("pageshow", function (e) {
    e.persisted && (clearTimeout(t), t = setTimeout(x, 300))
  }, !1), "complete" === a.readyState ? a.body.style.fontSize = 12 * l + "px" : a.addEventListener("DOMContentLoaded", function (e) {
    a.body.style.fontSize = 12 * l + "px"
  }, !1), x(), d.dpr = i.dpr = l, d.refreshRem = x, d.rem2px = function (e) {
    var t = parseFloat(e) * this.rem;
    return "string" == typeof e && e.match(/rem$/) && (t += "px"), t
  }, d.px2rem = function (e) {
    var t = parseFloat(e) / this.rem;
    return "string" == typeof e && e.match(/px$/) && (t += "rem"), t
  }, document.body.className = ""
}(window, window.lib || (window.lib = {}));




// WEBPACK FOOTER //
// ./src/assets/js/rem.js