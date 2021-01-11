/**
 * Created by Shinelon on 2016/12/15.
 */
var http = require('http'),
    querystring = require('querystring');
http.createServer(function (req, res) {
    var post = '';
    req.on('data', function (content) {
        post += content;
    });
    req.on('end', function () {
        post = querystring.parse(post);
        console.log(post);
    });
    res.writeHead(200, {
        "access-control-allow-origin": "*"
    });
    res.end('hello client');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');