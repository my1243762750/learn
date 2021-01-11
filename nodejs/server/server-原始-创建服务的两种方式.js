/**
 * Created by Shinelon on 2016/11/24.
 */
/**
 * 方式1
 */
var http = require('http');
var server = http.createServer(function (req, res) {
    //这里的req为http.serverRequest
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world');
}).listen(8888);

/**
 * 方式2
 */
var http = require('http');
var server = new http.Server().listen(8888);
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world');
});