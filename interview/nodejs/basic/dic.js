// 1判断是文件还是目录 stat (stats.isFile(), stats.isDirectory())
// 2创建目录 mkdir
// 3修改目录 rename
// 4删除目录 rmdir
// 5查询目录 readdir
// 6创建文件 writeFile
// 7删除文件 unlink
// 8修改文件（追加文件）appendFile
// 9查询文件（读取文件）readFile
// http
// url
// file
// nodemon 和 supervisor 区别
// 创建一个服务器（可以访问资源，可以下载资源）
// 创建一个express

const fs = require('fs');
const errorHandle = (err, res) => {
    if (err) {
        console.log(err);
    }
    if (res) {
        console.log('异步操作：', res.toString());
    }
}
const syncHandle = (res) => {
    if (res) {
        console.log('同步操作：', res.toString());
    }
}

/*// 测试1
// 异步创建目录
fs.mkdir('public', errorHandle);
// 同步创建目录
syncHandle(fs.mkdirSync('public2'));
console.log('hello');*/

/*// 测试2
// 异步查询目录
fs.readdir('public', errorHandle);
// 同步查询目录
syncHandle(fs.readdirSync('public'));
console.log('hello');*/

/*// 测试3(测试结果，不可以这样操作，只能重命名文件，重命名目录怎么办)
// 异步修改目录
fs.rename('public/index2.tml','index2.tml', errorHandle);
// 同步修改目录
// syncHandle(fs.renameSync('index.html2', 'index1.html'));
console.log('hello');*/

/*// 测试4(测试结果，如何目录里面，有文件就不可以删除)
// 异步删除目录
fs.rmdir('public', errorHandle);
// 同步查询目录
syncHandle(fs.rmdirSync('public2'));
console.log('hello');*/

/*// 测试5
// 异步创建文件
fs.writeFile('public/test.txt', 'some message', errorHandle);
// 同步创建文件
syncHandle(fs.writeFileSync('test2.html', 'some message'));
console.log('hello');*/

/*// 测试6
// 异步创建文件
fs.appendFile('public/test.txt', 'some message', errorHandle);
// 同步创建文件
syncHandle(fs.appendFileSync('test2.html', 'some message'));
console.log('hello');*/

/*// 测试7
// 异步创建文件
fs.readFile('public/test.txt', errorHandle);
// 同步创建文件
syncHandle(fs.readFileSync('test2.html'));
console.log('hello');*/

/*// 测试8(测试结构，如果目录不存在，删除会报错)
// 异步创建文件
fs.unlink('public/test.txt', errorHandle);
// 同步创建文件
syncHandle(fs.unlinkSync('test2.html'));
console.log('hello');*/

/*// 测试9
// 异步方法
fs.stat('./server', (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log(res);
    console.log(res.isFile());
    console.log(res.isDirectory());
})

// 同步方法
const res = fs.statSync('./server')
console.log(res);
console.log('hello')*/
