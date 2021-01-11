var fs = require('fs');
var http = require('http');
http.createServer(function (req, res) {
    console.log(req,req.body);

    var postData = "";
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        postData = querystring.parse(postData);
        console.log(postData);
        fs.writeFile('test.txt',postData,'utf8',function(err){
            if(err){
                throw err;
            }
            console.log('写入成功');
        });
        res.writeHead(200,{
            "access-control-allow-origin": "*",//设置跨越
            "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",//允许请求的方法
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end('上传成功');
    });
}).listen(9090);
// fs.readFile('./src/static/file/test', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('内容是: ' + data.toString());
//     }
// });