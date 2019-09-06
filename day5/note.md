### multer处理文件上传

```ecmascript 6
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    // 给上传文件重命名
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.');

        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

const upload = multer({
    storage: storage
});


const app = express();

app.use('/static', express.static('public'));

app.post('/upload-single', upload.single('logo'), function (req, res) {
    console.log(req.file);

    console.log('文件类型：%s', req.file.mimetype);
    console.log('原始文件名：%s', req.file.originalname);
    console.log((req.file.originalname).split("."));
    console.log('文件大小：%s', req.file.size);
    console.log('文件保存路径：%s', req.file.path);
    console.log(req.body.username);
    res.send({
        ret_code: '0',
        filepath: req.file.path
    });
});

app.listen(3000);

```
前端
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script>
    <script>
        function doUpload() {
            $.ajax({
                url: '/upload-single',
                type: 'POST',
                cache: false, //不必须
                data: new FormData($('#uploadForm')[0]),
                processData: false,//必须
                contentType: false,//必须
                success: function(data) {
                    console.log(data)
                    if (data.ret_code === '0') {
                        alert('上传成功 文件路径: ' + data.filepath)
                    }
                }
            })
        }
    </script>
</head>
<body>
    <form id="uploadForm" action="/upload-single" method="post" enctype="multipart/form-data">
        <input type="file" name="logo" />
        <input type="text" name="username" />
        <input type="submit" value="表单提交">
    </form>
    <button onclick="doUpload()">ajax提交</button>
</body>
</html>
```


### 服务器代理跨域原理
+ 利用http-proxy-middleware实现代理跨域
   - 利用http-proxy-middleware实现代理跨域
   - const proxy = require('http-proxy-middleware')
   - app.use('/api', proxy({target: 'http://10.119.168.87:4000', changeOrigin: true}));
   - 当访问 http://localhost/api   相当于   http://10.119.168.87:4000/api
+ 浏览器直接调用不同域api被拦截
    - 访问 百度音乐API https://www.jianshu.com/p/e9d43d15f6ba
    - http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=10&offset=0
    - app.use('/v1/restserver/ting', proxy({target: 'http://tingapi.ting.baidu.com', changeOrigin: true}));
    - 使用nodejs写一个代理服务访问不同域api

### CORS
```ecmascript 6
        var http = new XMLHttpRequest();
  
      http.onreadystatechange = function () {
          switch (this.readyState) {
              case 4:
                  if (this.status === 200) {
                  ///
        http.open('GET', 'http://localhost:3000/test');
                    http.setRequestHeader('Content-Type', 'application/json;charset=utf8');
                    http.send()     
```

+ 服务器中间件处理 OPTIONS 请求 处理 Access-Control-Allow-Origin 等头信息
```ecmascript 6
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
```  

### npmscript
    

###  scocket 实时通信

- WebSocket
    + npm install ws --save
    + const WebSocket = require('ws');
    + const wss = new WebSocket.Server({ port: 8080 });
    + wss.on('connection', handler)
    
    + ws.on('message', handler), ws.on('close', handler)
    + socket = new WebSocket('ws://localhost:8080');
    + socket.onopen, socket.onmessage
    + html5 WebSocket 和 nodejs 服务通信
```ecmascript 6
        var socket;
        window.onload = function () {
            var msgarea = document.getElementById('msgList');

            // 打开一个 websocket 连接  ws:// 表示 websocket 协议
            socket = new WebSocket('ws://192.168.52.117:8080');

            // 当连接打开是 触发
            socket.onopen = function () {};
            // 当收到 服务端的消息是触发
            socket.onmessage = function (message) {
                console.log('message', message.data);
                let msgObj = JSON.parse(message.data);
                msgarea.value += msgObj.nickname + ': ' + msgObj.msg + '\n';
            };
            // 当服务端 调用 close 方法 或者 服务关闭的时候 触发
            socket.onclose = function () {
                console.log('close')
            }
        };
        function send() {
            let nickname = document.getElementById('nickname').value;
            let msg = document.getElementById('msg').value;

            let obj = {
                nickname: nickname,
                msg: msg
            }
            socket.send(JSON.stringify(obj))
        }
```

```ecmascript 6
const WebSocket = require('ws');

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

```
    
- socket.io
    + 第三方 WebSocket实现
    + npm install socket.io --save
    + 抹平浏览器兼容性
- net
    + nodejs 原生Socket网络通信

作业
    实现一个在线聊天室


#### Cookie+Session
 
```js
const  cookieParse=require('cookie-parser')
const  session = require('express-session')
 
app.use(cookieParser());

app.use(session({
    secret: 'hubwizApp', //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60 * 1000 * 60 * 24 }, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false, //无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
}));
app.get('/somepath', function(req, res) {
  req.session;
})
```
