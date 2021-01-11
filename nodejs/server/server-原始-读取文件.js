var fs = require('fs');
fs.readFile('./src/static/file/test', function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log('内容是: ' + data.toString());
    }
});