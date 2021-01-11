/**
 * Created by Shinelon on 2016/12/21.
 */
function MyClock(canvas,style) {
    var _ctx = canvas.getContext('2d'),
        centerX = canvas.width / 2,
        centerY = canvas.height / 2;
    var _style = {
        outerCircle: {
            r: 200,
            lineWidth: 5,
            color: '#ccc'
        },
        oHourMark: {
            lineWidth: 7,
            color: '#000',
            lineCap: 'round',
            start: 170,
            length: 20
        },
        oMinuteMark: {
            lineWidth: 5,
            color: '#000',
            lineCap: 'round',
            start: 180,
            length: 10
        },
        oHourPinter: {
            lineWidth: 7,
            color: 'orange',
            lineCap: 'round',
            start: -120,
            length: 130
        },
        oMinutePinter: {
            lineWidth: 5,
            color: 'blue',
            lineCap: 'round',
            start: -160,
            length: 175
        },
        oSecondPinter: {
            lineWidth: 3,
            color: '#f00',
            lineCap: 'round',
            start: -185,
            length: 205
        },
        oMHSJunction: {
            r: 5,
            lineWidth: 2,
            color: 'red',
            background: '#fff'
        },
        oLogo: {
            lineWidth: 1,
            color: 'black',
            x: -20,
            y: 30,
            text: 'meiyang'
        },
        oNumber: {
            lineWidth: 1,
            start: 150,
            font: '16px arial,sans-serif'
        }
    };
    this._DrawClock = function () {
        _ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 获取时间
        var _date = new Date(),
            _seconds = _date.getSeconds(),
            _minutes = _date.getMinutes() + _seconds / 60,
            _hours24 = _date.getHours() + _minutes / 60,
            _hours = _hours24 > 12 ? _hours24 - 12 : _hours24;

        // 外圈
        _ctx.beginPath();
        _ctx.lineWidth = _style.outerCircle.lineWidth;
        _ctx.strokeStyle = _style.outerCircle.color;
        _ctx.arc(centerX, centerY, _style.outerCircle.r, 0, 360, false);
        _ctx.stroke();
        _ctx.closePath();
        _ctx.save();

        //时针刻度
        _ctx.beginPath();
        _ctx.translate(centerX, centerY);
        _ctx.lineWidth = _style.oHourMark.lineWidth;
        _ctx.strokeStyle = _style.oHourMark.color;
        _ctx.lineCap = _style.oHourMark.lineCap;
        for (var i = 0; i < 12; i++) {
            _ctx.rotate(30 * Math.PI / 180);
            _ctx.moveTo(0, -_style.oHourMark.start);
            _ctx.lineTo(0, -_style.oHourMark.start - _style.oHourMark.length);
        }
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //数字 width/2 fontsize/3
        _ctx.beginPath();
        _ctx.translate(centerX, centerY);
        _ctx.lineWidth = _style.oNumber.lineWidth;
        _ctx.font = _style.oNumber.font;
        for (var j = 0; j < 12; j++) {
            var angle = (j * 30 - 60) * Math.PI / 180,
                txt = (j + 1) + '',
                txtW = _ctx.measureText(txt).width,
                x = _style.oNumber.start * Math.cos(angle) - txtW / 2,
                y = _style.oNumber.start * Math.sin(angle) + txtW / 2;
            _ctx.fillText(txt, x, y);
        }
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //标志
        _ctx.beginPath();
        _ctx.translate(centerX, centerY);
        _ctx.lineWidth = _style.oLogo.lineWidth;
        _ctx.strokeStyle = _style.oLogo.color;
        _ctx.strokeText(_style.oLogo.text, _style.oLogo.x, _style.oLogo.y);
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //分针刻度
        _ctx.beginPath();
        _ctx.translate(centerX, centerY);
        _ctx.lineWidth = _style.oMinuteMark.lineWidth;
        _ctx.strokeStyle = _style.oMinuteMark.color;
        //_ctx.lineCap = _style.oMinuteMark.lineCap;
        for (var k = 0; k < 60; k++) {
            _ctx.rotate(6 * Math.PI / 180);
            _ctx.moveTo(0, -_style.oMinuteMark.start);
            _ctx.lineTo(0, -_style.oMinuteMark.start - _style.oMinuteMark.length);
        }
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //时针
        _ctx.beginPath();
        _ctx.translate(centerX, centerY);
        _ctx.lineWidth = _style.oHourPinter.lineWidth;
        _ctx.strokeStyle = _style.oHourPinter.color;
        _ctx.rotate(_hours * 30 * Math.PI / 180);
        _ctx.moveTo(0, _style.oHourPinter.start);
        _ctx.lineTo(0, _style.oHourPinter.start + _style.oHourPinter.length);
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //分针
        _ctx.beginPath();
        _ctx.lineWidth = _style.oMinutePinter.lineWidth;
        _ctx.strokeStyle = _style.oMinutePinter.color;
        _ctx.translate(centerX, centerY);
        _ctx.rotate(_minutes * 6 * Math.PI / 180);
        _ctx.moveTo(0, _style.oMinutePinter.start);
        _ctx.lineTo(0, _style.oMinutePinter.start + _style.oMinutePinter.length);
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //秒针
        _ctx.beginPath();
        _ctx.lineWidth = _style.oSecondPinter.lineWidth;
        _ctx.strokeStyle = _style.oSecondPinter.color;
        _ctx.translate(centerX, centerY);
        _ctx.rotate(_seconds * 6 * Math.PI / 180);
        _ctx.moveTo(0, _style.oSecondPinter.start);
        _ctx.lineTo(0, _style.oSecondPinter.start + _style.oSecondPinter.length);
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
        _ctx.save();

        //画出时针，分针，秒针交叉点
        _ctx.beginPath();
        _ctx.lineWidth = _style.oMHSJunction.lineWidth;
        _ctx.strokeStyle = _style.oMHSJunction.color;
        _ctx.translate(centerX, centerY);
        _ctx.arc(0, 0, _style.oMHSJunction.r, 0, 360, false);
        _ctx.fillStyle = _style.oMHSJunction.background;
        _ctx.fill();
        _ctx.stroke();
        _ctx.closePath();
        _ctx.restore();
    };
}

MyClock.prototype = {
    fnWork: function () {
        this._DrawClock();
        setInterval(this._DrawClock, 1000);
    }
};


