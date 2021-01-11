/*
 * iSoftStone javascript 日期操作对象
 * Author:      Hanks
 * Create Date: 2014/11/17
 */
var iDateTime = {
    version: "1.0",
    crtDate: new Date(),
    getDateOfInterval: function (d, ivtHrs) {
        var ivtDate = new Date()
        ivtDate.setTime(d.getTime() + 1000 * 60 * 60 * ivtHrs)

        return ivtDate
    },
    setThisDate: function (d) {
        this.crtDate = d
    },
    getThisDate: function () {
        return this.crtDate
    },
    format: function (d, f) {
        var o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            "S": d.getMilliseconds() //毫秒
        }
        if (/(y+)/.test(f))
            f = f.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (var k in o)
            if (new RegExp("(" + k + ")").test(f))
                f = f.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        return f
    },
    getDayCN: function (d) {
        return "日一二三四五六".charAt(d.getDay())
    },
    getDayEn: function (d) {
        return ["SUN", "MON", "TUE", "WED", "THU", "FRL", "SAT"][d.getDay()]
    },
    getWeekDataByImportantFormat: function () {
        var daysOfWeek = []

        for (var i = 0; i < 7; i++) {
            var theDate = this.getDateOfInterval(this.crtDate, (i - this.crtDate.getDay()) * 24)

            daysOfWeek.push({
                "day": "日一二三四五六".charAt(i),
                "date": theDate.getDate(),
                "dateTime": theDate.Format("yyyy-MM-dd"),
                "isToday": (this.format(new Date(), "yyyyMMdd") == this.format(theDate, "yyyyMMdd")) ? true : false,
                "hasImportant": 0
            })
        }

        return daysOfWeek
    },
    getYMByImportantFormat: function () {
        var y = this.crtDate.getFullYear()
        var m = this.crtDate.getMonth() + 1

        return y + "年" + m + "月"
    }
}

Date.prototype.format = function (format = "yyyy/MM/dd HH:mm:ss") {
    return iDateTime.format(this, format)
}


// WEBPACK FOOTER //
// ./src/assets/utils/DateTime.js