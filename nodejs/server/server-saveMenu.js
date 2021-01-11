var fs = require('fs')
var express = require('express');
var bodyParser = require('body-parser');//获取post参数
var app = new express();

// 解析 application/json
app.use(bodyParser.json());//获取post参数

// 设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', function (req,res) {
    console.log('express');
    res.end('hello world express');
});

app.post('/saveMenu', function (req, res) {
    console.log('express', req.body);
    console.log('express', req.body.length);
    let path = '../../vue/hello-world/src/assets/menuData/menu.json'
    fs.writeFile(path, JSON.stringify(req.body), 'utf-8', (error) => {
        if (error) {
            res.send({
                success: false,
                message: '保存失败'
            });
            return false
        }
        console.log('写入成功')
        res.send({
            success: true,
            message: '保存成功'
        });
    })
});

app.listen(9001, function (req, res) {
    console.log('已启动');
});