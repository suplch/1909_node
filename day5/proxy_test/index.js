const express = require('express');
const http = require('http');

const path = require('path');

// 导入 代理中间件
const proxy = require('http-proxy-middleware');

const app = express();

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/',
    proxy({target: 'http://www.icbc.com.cn/icbc', changeOrigin: true}));

//    https://www.jianshu.com/p/e9d43d15f6ba
// 配置代理中间件
// app.use('/v1/restserver/ting',
//     proxy({target: 'http://tingapi.ting.baidu.com', changeOrigin: true}));


// app.use(function (req, res, next) {
//     console.log(req.url);
//
//     if (req.url.startsWith('/v1/restserver/ting')) {
//         http.get('http://tingapi.ting.baidu.com' + req.url, function (response) {
//             let body = Buffer.alloc(0);
//             response.on('data', function (chunk) {
//                 body = Buffer.concat([body, chunk]);
//             });
//             response.on('end', function () {
//                 console.log(body.toString());
//                 res.send(body.toString());
//
//             })
//         })
//     } else {
//         next();
//     }
// });

app.get('/api/baidu/', function (req, res) {



});


app.listen(8000);

