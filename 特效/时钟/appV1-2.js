/**
 * Created by Shinelon on 2016/12/21.
 */
//获取画布DOM
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
fnDraw();
setInterval(fnDraw, 1000);
function fnDraw() {
    // 初始化画布
    var date = new Date(),
        seconds = date.getSeconds(),
        minutes = date.getMinutes() + seconds / 60,
        hours24 = date.getHours() + minutes / 60,
        hours = hours24 > 12 ? hours24 - 12 : hours24;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ccc';
    ctx.arc(250, 250, 200, 0, 360, false);//顺时针
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    //时针刻度
    ctx.beginPath();
    ctx.translate(250, 250);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#000';
    ctx.lineCap = 'round';
    for (var i = 0; i < 12; i++) {
        ctx.rotate(30 * Math.PI / 180);
        ctx.moveTo(0, -170);
        ctx.lineTo(0, -190);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //数字 width/2 fontsize/3
    ctx.beginPath();
    ctx.translate(250, 250);
    ctx.lineWidth = 1;
    ctx.font = '30px arial,sans-serif';
    for (var j = 0; j < 12; j++) {
        var angle = (j * 30 - 60) * Math.PI / 180,
            txt = (j + 1) + '',
            txtW = ctx.measureText(txt).width,
            x = 150 * Math.cos(angle) - txtW/2,
            y = 150 * Math.sin(angle) + 10;
        ctx.fillText(txt, x, y);
    }
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //分针刻度
    ctx.beginPath();
    ctx.translate(250, 250);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#000';
    for (var k = 0; k < 60; k++) {
        ctx.rotate(6 * Math.PI / 180);
        ctx.moveTo(0, -180);
        ctx.lineTo(0, -190);
    }
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //时针
    ctx.beginPath();
    ctx.translate(250, 250);
    ctx.lineWidth = 7;
    ctx.strokeStyle = "orange";
    ctx.rotate(hours * 30 * Math.PI / 180);
    ctx.moveTo(0, -120);
    ctx.lineTo(0, 10);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //分针
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.translate(250, 250);
    ctx.rotate(minutes * 6 * Math.PI / 180);
    ctx.moveTo(0, -160);
    ctx.lineTo(0, 15);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //秒针
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#f00";
    ctx.translate(250, 250);
    ctx.rotate(seconds * 6 * Math.PI / 180);
    ctx.moveTo(0, -185);
    ctx.lineTo(0, 20);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    ctx.save();
    //画出时针，分针，秒针交叉点
    ctx.beginPath();
    ctx.strokeStyle = "#f00";
    ctx.translate(250, 250);
    ctx.arc(0, 0, 5, 0, 360, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

