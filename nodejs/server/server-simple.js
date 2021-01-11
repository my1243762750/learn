/**
 * Created by Shinelon on 2017/7/12.
 */
var express = require('express');
var bodyParser = require('body-parser');//获取post参数
var path = require('path');
var app = express();

var result = {message: 'hello world'};

//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// 解析 application/json
app.use(bodyParser.json());//获取post参数

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req, res) {
    // 获取参数的三种方式，更多详情请看:http://www.linuxidc.com/Linux/2012-04/58730.htm
    console.log(req.url, req.params, req.query, req.body);
    console.log('请求收到');
    var _callback = req.query.callback;
    setTimeout(() => {
        // res.send(_callback + '(1,2)');
        console.log('返回数据给客户端');
        res.send({
            name: 'A'
        });
    }, 4000)
});

app.get('/A', function (req, res) {
    console.log('收到请求');
    res.send(result);
});

app.get('/B', function (req, res) {
    console.log(req.params, req.query, req.body);
    res.send({
        name: 'B'
    });
});

app.get('/C', function (req, res) {
    console.log(req.params, req.query, req.body);
    res.send({
        name: 'C'
    });
});

app.get('/D', function (req, res) {
    console.log(req.params, req.query, req.body);
    res.send({
        name: 'zhangsan',
        age: 19
    });
});

app.post('/user', function (req, res) {
    console.log(req.url, req.params, req.query, req.body);
    res.send({
        name: 'zhangsan',
        age: 19
    });
});

app.post('/login', function (req, res) {
    console.log(req.params,req.query,req.body);
    res.send('登陆成功');
});

var server = app.listen(8082, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});