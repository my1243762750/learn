/**
 * Created by Shinelon on 2017/7/12.
 */
var express = require('express');
var formidable = require('express-formidable');
var app = express();

//
app.use(formidable());

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.post('/file', function (req, res) {
    console.log(req.fields);
    console.log(req.files);
    // console.log(req.url, req.params, req.query, req.body);
    // console.log(req.query.userName, req.query.password);
    res.send('添加成功');
});

var server = app.listen(8084, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});