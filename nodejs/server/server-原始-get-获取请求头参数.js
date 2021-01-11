/**
 * Created by Shinelon on 2016/12/15.
 */
var http = require('http'),
    url = require('url'),
    querystring = require('querystring');
http.createServer(function (req,res) {
    /*过滤favicon.ico 请求*/
    if(req.url!=="/favicon.ico"){
        var sUrl = req.url,
            sPathname = url.parse(sUrl).pathname,
            sQuery = url.parse(sUrl).query,
            sName = querystring.parse(sQuery)['name'],
            sPwd = querystring.parse(sQuery)['pwd'];
        //console.log('pathname:'+sUrl);
        //console.log('url:'+sPathname);
        //console.log('query:'+sQuery);

        console.log('name:'+sName);
        console.log('pwd:'+sPwd);
    }
    /*设置跨域请求*/
    res.writeHead(200,{
        "access-control-allow-origin": "*"
    });
    res.end('hello client');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');