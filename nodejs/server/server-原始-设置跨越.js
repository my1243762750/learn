/**
 * Created by Shinelon on 2016/12/1.
 */
var http = require('http');
http.createServer(function (req, res) {
    // 方式1
    res.setHeader("Access-Control-Allow-Origin","*");//设置跨越
    // 方式2
    res.writeHead(200,{
        "access-control-allow-origin": "*",//设置跨越
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",//允许请求的方法
        "access-control-allow-headers": "content-type, accept",//允许的请求头
        "access-control-max-age": 10,
        "Content-Type": "application/json"
    });
    // 注意:两种方式都可以设置请求头，只不过setHeader每次只能设置一个，而writeHead可以设置多个
}).listen(8080);