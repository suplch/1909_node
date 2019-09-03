const path = require('path');
// 导入express第三方模块
const express = require('express');

// 调用express 函数 返回 app对象, app表示一个网站应用程序
const app = express();

// 映入 body 解析器, 用来 解析 浏览器 post 提交过来的 json 数据
// const bodyParser = require('body-parser');
// // 执行 bodyparser 的 json 中间件 处理函数
// app.use(bodyParser.json());

const myBodyParser = require('./body-parser/body-parser');
app.use(myBodyParser.json());

// app.use 表示使用一个中间件
// req 表示请求对象, res 表示响应对象,  next是一个函数, 调用它, 可以将任务传递给下一个中间件
app.use(function (req, res, next) {

    console.log(`--------${req.url}--------`);
    // 继续处理下一步
    next();
    console.log('++++++++++++++++++');

    //res.send('test')
});

app.use(function (req, res, next) {
   console.log(`==========${req.url}==========`);
    next();
   console.log('||||||||||||||||')
});

// app.use  表示使用一个中间件
// express.static 设置一个网站的静态资源
//app.use(express.static(path.join(__dirname, 'public')));

const mystatic = require('./my-static/my-static');
app.use(mystatic.static(path.join(__dirname, 'public')));

app.get('/login.html', function (req, res) {
    res.send("<html><body><input> <button>登录</button></body></html>")
});

app.get('/get_user_account', function (req, res) {
    // 如果用户登录成功 那么返回 余额 否则,
    res.send({
        amount: 10000000000
    });
});

// 定义一个get请求, 当浏览器 访问 网站 /get_userinfo 路径的时候, 执行这个回调函数
// req 表示一个请求对象, res 表示一个响应对象
app.get('/get_userinfo', function (req, res) {
    console.log(' 开始执行 /get_userinfo');
    const userInfo = {
        username: '张三',
        age: 18,
        sex: '男'
    };
    // 将 userInfo js 对象 发给浏览器
   res.send(userInfo);
});

// 注册一个post 服务
app.post('/commit_userinfo', function (req, res) {
    console.log(req.body); // 获取 浏览器发过来的json 数据
    res.send({
        msg: 'ok'
    })
});

const port = 3000;
// 监听 3000 端口
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`服务已经启动 请访问 http://localhost:${port}`)
});
