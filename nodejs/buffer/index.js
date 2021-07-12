// console.log(Buffer);
// const b1 = Buffer.from('10');
// const b3 = Buffer.from([10]);
// const b4 = Buffer.from(b3);
// console.log(b1);
// console.log(b3);
// console.log(b4);
// const buffer = Buffer.from('你好', 'utf-8');
// console.log(buffer);
// const str = buffer.toString('utf-8');
// console.log(str);
const fs = require('fs');
const inputStream = fs.createReadStream('input.txt');
const outputStream = fs.createWriteStream('output.txt');

inputStream.pipe(outputStream);
