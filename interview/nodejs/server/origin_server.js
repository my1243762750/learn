const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mineObj = require('./data/mime.json');

// 获取MIME类型
function getMime(ext) {
    return mineObj[ext];
}

// 创建服务
http.createServer((req, res) => {
    let pathname = url.parse(req.url, true).pathname;
    if (pathname === '/') {
        pathname = '/index.html'
    }
    const extname = path.extname(pathname);
    const mime = getMime(extname);
    res.writeHead(200, {'content-type': `${mime};charset=utf-8`});
    console.log('pathname:', pathname);
    if (pathname !== '/favicon.ico' && extname) {
        fs.readFile(`.${pathname}`, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.end(data);
        })
    } else {
        if (pathname === '/shop') {
            fs.readFile(`./html/shop.html`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.end(data);
            })
        } else if (pathname === '/news') {
            fs.readFile(`./html/news.html`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.end(data);
            })
        } else {
            fs.readFile(`./html/404.html`, (err, data) => {
                if (err) {
                    console.log(err);
                }
                res.end(data);
            })
        }
    }
}).listen(9090);

console.log('http:localhost:9090', 'start');
