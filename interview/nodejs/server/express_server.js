const express = require('./plugins/express');
const app = express();

app.get('/shop', (req, res) => {
    res.send('shop');
});

app.post('/news', (req, res) => {
    res.send('news');
});

const server = app.listen(9091, () => {
    // var host = server.address().address;
    var port = server.address().port;
    // console.log("应用实例，访问地址为 http://%s:%s", host, port)
    console.log('server', port, server);
})
