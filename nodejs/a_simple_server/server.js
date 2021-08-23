const http = require('http');

http.createServer((req, res) => {
    // response.setHeader() 允许你只设置单数标题。
    // response.writeHead() 会允许你设置响应头的所有内容，包括状态代码，内容和多个标题。
    const data = '你好，世界';
    // res.setHeader('Content-type', 'text/plain;charset=UTF-8');
    // res.setHeader('Set-Cookie', 'type = setHeader');
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=UTF-8',
        'Set-Cookie': 'type = writeHead'
    });
    res.end(data);
}).listen('9999')