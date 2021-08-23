const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

function getMimeType (extname) {
    let res = fs.readFileSync('./mime.json', 'utf-8');
    res = JSON.parse(res.toString());
    return res[extname];
}

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    pathname = pathname === '/' ? '/index.html' : pathname;
    let extname = path.extname(pathname);
    fs.readFile( '../dist'+ pathname, 'utf-8', (err, data) => {
        res.writeHead(200, {
            'Content-Type': `${getMimeType(extname)};charset=UTF-8`
        });
        res.end(data);
    })
}).listen('9999')