const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mineObj = require('../data/mime.json');

// 扩展send方法
function addSendFn(res, mime) {
    res.send = (data) => {
        res.writeHead(200, {'content-type': `${mime};charset=utf-8`});
        res.end(data);
    }
}

// 获取MIME类型
function getMime(ext) {
    return mineObj[ext];
}

module.exports = () => {
    const routes = {
        getFns: {},
        postFns: {}
    }

    return {
        get: (path, cb) => {
            routes.getFns[path] = cb || function(){};
        },
        post: (path, cb) => {
            routes.postFns[path] = cb || function(){};
        },
        listen: (port, cb) => {
            const server = http.createServer((req, res) => {
                server.address = () => {
                    return {
                        port
                    }
                }
                cb && cb();

                // 解析参数
                let pathname = url.parse(req.url, true).pathname;
                if (pathname === '/') {
                    pathname = '/index.html'
                }
                const extname = path.extname(pathname);
                const mime = getMime(extname);
                const method = req.method.toLowerCase();
                // 扩展send方法
                addSendFn(res, mime);
                console.log('pathname:', pathname);
                // 匹配静态资源
                if (pathname !== '/favicon.ico' && extname) {
                    fs.readFile(`.${pathname}`, (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        res.send(data);
                    })
                }
                // 匹配路由
                else {
                    try {
                        if (method === 'get') {
                            const fn = routes.getFns[pathname];
                            fn(req, res);
                        } else if (method === 'post') {
                            let temp = '';
                            const fn = routes.postFns[pathname];
                            req.on('data', function (chunk) {
                                temp += chunk;
                            })
                            req.on('end', function() {
                                res.body = temp.toString();
                                fn(req, res);
                            })
                        }
                    } catch (e) {
                        fs.readFile(`./html/404.html`, (err, data) => {
                            if (err) {
                                console.log(err);
                            }
                            res.send(data);
                        })
                    }
                }
            }).listen(port);
            return server;
        }
    };
}
