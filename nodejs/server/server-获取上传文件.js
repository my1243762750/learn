var fs = require('fs');
var express = require('express');
var multer  = require('multer');
var app = express();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './my-uploads')
    },
    filename: function (req, file, cb) {
        console.log('file', file);
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });

// 单文件上传
app.post('/api/upload', upload.single('file'), function(req, res, next){
    console.log('收到请求', req.file);
    res.send({ret_code: '0'});
});

// 多文件上传
app.post('/api/mulupload', upload.array('file', 100), function(req, res, next){
    console.log('收到请求', req.file);
    res.send({ret_code: '0'});
});

app.get('/form', function(req, res, next){
    var form = fs.readFileSync('./index.html', {encoding: 'utf8'});
    res.send(form);
});



app.listen(3000);
