/**
 * Created by Shinelon on 2017/7/12.
 */
var express = require('express');
var bodyParser = require('body-parser');//获取post参数
var path = require('path');
var app = express();

//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// 解析 application/json
app.use(bodyParser.json());//获取post参数

//设置跨域访问
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type,meiyang');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.get('/data', function (req, res) {
    console.log('请求收到');
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.cookie('main', 'hello world');
    res.send({
        data: '请求收到'
    });
});

app.post('/login', function (req, res) {
    console.log('登录成功');
    console.log(req, req.params, req.query, req.body);
    res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Header", "meiyang");
    res.cookie('name', 'koby');
    res.send({
        data: '登录通过'
    });
});

var server = app.listen(8082, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});