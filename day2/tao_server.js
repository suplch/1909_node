const http = require('http');
const fs = require('fs');

// 设置 mime 类型集合
const mimeMap = {
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.png': 'image/png'
};

const server = http.createServer(function (req, res) {  // 创建一个http 服务器, req 表示客户端的请求, res 表示服务端的响应
    console.log('一个请求 被接受', req.url);
    if (fs.existsSync('./static' + req.url)) {
        const stats = fs.statSync('./static' + req.url);
        if (stats.isFile()) {
            let url = req.url;
            if (url === '/') {
                url = '/index.html';
            }
            let position = url.lastIndexOf('.');
            let ext = url.substr(position);  // 返回文件的扩展名
            let mime = mimeMap[ext] || 'text/plain';  // 通过扩展名 界定mime 类型
            res.writeHead(200, { // res 响应 一个 200 表示成功, 同时设置了一个 content-type 的响应头
                "Content-Type": `${mime}`   // 告诉浏览器 响应的内容是 javascript 源代码
            });
            let content = fs.readFileSync('./static' + req.url);
            res.end(content)
        } else if (req.url === '/') {
            res.writeHead(200, { // res 响应 一个 200 表示成功, 同时设置了一个 content-type 的响应头
                "Content-Type": `text/html; charset=utf-8`   // 告诉浏览器 响应的内容是 javascript 源代码
            });
            let content = fs.readFileSync('./static/index.html');
            res.end(content)
        } else {
            res.writeHead(200, {
                "Content-Type": "text/plain; charset=utf-8"
            });
            res.end("404 网页未找到");
        }
    } else {
        res.writeHead(200, {
            "Content-Type": "text/plain; charset=utf-8"
        });
        res.end("404 网页未找到");
    }

    // // req.url  通过客户端的请求对象, 发到请求路径
    // if (req.url === '/aaa.js') {// 如果 url 是 /aaa.js 表示 浏览器需要一个js文件
    //     res.writeHead(200, { // res 响应 一个 200 表示成功, 同时设置了一个 content-type 的响应头
    //         "Content-Type": "application/javascript; charset=utf-8"   // 告诉浏览器 响应的内容是 javascript 源代码
    //     });
    //     res.end(js)  // 向浏览器 发送一行 js 代码
    // } else if (req.url === '/' || req.url === '/index.html') {   // 表示 请求的是首页
    //     res.writeHead(200, {
    //         "Content-Type": "text/html; charset=utf-8"
    //     });
    //     // 想浏览器响应 首页的html 代码
    //     res.end(html);
    // } else {// 否则表示 未找到 网页
    //     res.writeHead(200, {
    //         "Content-Type": "text/plain; charset=utf-8"
    //     });
    //     res.end("404 网页未找到");
    // }
});

// 监听 8000端口号
server.listen(8000, function (err) {
    if (err) {// 如果有错误 打印一下错误消息
        console.log(err);
        return;
    }

    console.log('服务已经启动, 正在监听8000端口')
});
