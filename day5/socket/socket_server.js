const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});


wss.on('connection', function (client) {
    console.log('一个客户端连接')

    client.on('message', function (message) {

        console.log('来自客户端的数据: ' + message)

    })

    client.send('hello I am node server');

    setInterval(function () {
        client.send('hello I am node server' + new Date().toString());
    }, 1000)
});
