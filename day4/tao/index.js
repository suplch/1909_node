const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto'); // 加密模块
const path = require('path');
const taodb = require('./taodb');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/goods/get_goods_list', async function (req, res) {
    let goods_list = await taodb.getGoodsList();
    res.send(goods_list);
});

app.post('/goods/delete_goods', async function (req, res) {
    try {
        let ret = await taodb.deleteGoods(req.body.good_id);
        res.send({
            success: ret.ok,
            msg: ret.msg
        })
    } catch (err) {
        res.send({
            success: false,
            msg: err.message
        })
    }
});

app.post('/goods/publish_goods', async function (req, res) {

    console.log(req.body);

    let ret = await taodb.addGoods(req.body);

    res.send({
        success: ret.ok
    })
});


app.post('/auth/register', async function (req, res) {

    let md5 = crypto.createHash('md5');
    // 对用户密码 进行 md5 加密
    let password = md5.update(req.body.password).digest('hex');
    req.body.password = password;

    let ret = await taodb.registerUser(req.body);
    res.send({
        success: ret.ok
    })
});
app.post('/auth/login', async function (req, res) {

    let userInfo = await taodb.getUserByLoginName(req.body.login_name);
    if (userInfo) {
        let md5 = crypto.createHash('md5'); // 创建一个MD5加密方法
        // 对用户名进行加密处理
        let password = md5.update(req.body.password).digest('hex');
        if (password === userInfo.password) {
            res.send({
                login_ok: true
            });
            return;
        }
    }
    res.send({
        login_ok: false
    })
});

const port = 3000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err)
    }

    console.log(`服务已经启动, 访问 http://localhost:${port}`);
});
