/**
 * Created by Shinelon on 2016/11/24.
 */
/**
 * 方式1
 */
var express = require('express');
var app = express();
app.listen(3000);

/**
 * 方式2
 */
var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(3000);