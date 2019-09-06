const WebSocket = require('ws'); // npm install ws --save
const path = require('path');

//WebSocket 创建一个双向的Socket 通信 监听 8080端口
const wss = new WebSocket.Server({port: 8080});

let clientList = [];

// 注册是个 connection 事件, 当有客户端连接到服务端是触发
wss.on('connection', function (client) {
    // 回调函数 的参数 ws 表示一个客户端
    console.log('connection');

    clientList.push(client)

    // 当 message 事件触发, 表示 客户端 发来了消息
    client.on('message', function (message) {
        console.log(typeof message);
        console.log('message', message);

        broadCast(message)
    });

    // 当客户端关闭的时候 触发
    client.on('close', function () {
        console.log('close')
    });

});

function broadCast(message) {
    for (let client of clientList) {
        client.send(message)
    }
}


const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname)));

app.listen(8000);
