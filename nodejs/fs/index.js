const fs = require('fs');
// 错误处理
function err(message) {
    return (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(message, data);
    }
}
// 创建文件
// fs.writeFile('index3.js', 'hello world', err('writeFile'));
// 修改文件(删除+创建)
// 删除文件
// fs.unlink('./index1.js', err('unlink'));
// 读取文件
// fs.readFile('./index1.js', 'utf8', err('readFile'));
// 追加文件
// fs.appendFile('index3.js', 'my name', err('appendFile'));
// 复制文件
// fs.copyFile('index.js', 'index2.js', err('copyFile'));

// 创建目录
// fs.mkdir('components', err('mkdir'));
// 修改目录
// fs.rename('index2.js', 'index21.js', err('rename'));
// 删除目录（需要管理员权限）
// fs.unlink('./components', err('unlink'));
// 读取目录
// fs.readdir('./components', err('readdir'));
// 判断是目录还是文件
fs.stat('./components', (err, data) => {
    if (err) {
        console.log(err);
    }
    if (data.isFile()) {
        console.log('file')
    } else if (data.isDirectory()) {
        console.log('directory')
    }
});
