// nodejs中文件操作主要依靠fs模块
const fs = require('fs')
// 1. 定义两个工具函数
// 获取指定目录路径下的所有文件名
const getFileNames = path => {
    // 使用readdir获取指定目录下的所有文件名
    return fs.readdirSync(path);;
}

// 根据指定字符截取文件名，返回截取后的字段
const getFileSuffix =  (fileName, splitChar) => {
    // 取字符第一次出现的位置
    // const first = fileName.indexOf(splitChar); 
    // 取字符最后一次出现的位置（根据需要选择）
    const first = fileName.lastIndexOf(splitChar); 

    const namelength = fileName.length; //取到文件名长度
    return fileName.substring(first + 1, namelength); //截取获得后缀名
}

// 2. 定义目录
const dirName = ``;
// 3. 读取与改写
let files = getFileNames(dirName);
files.forEach((item, i) => {
    // 这里对旧名操作获取新名
    let newName = getFileSuffix(item, ".")
    newName = (i + 1) + '.' + newName;
    console.log(item, newName)
    // 使用rename方法进行重命名
    fs.rename(`${dirName}\\${item}`, `${dirName}\\${newName}`, (err) => {
        if (err) throw err;
        console.log('重命名完成');
    });
})