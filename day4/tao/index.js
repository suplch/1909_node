const express = require('express');
const bodyParser = require('body-parser');

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

app.post('/goods/publish_goods', function (req, res) {

    console.log(req.body);

    let ret = taodb.addGoods(req.body);

    res.send({
        success: ret.ok
    })
});

const port = 3000;
app.listen(port, function (err) {
    if (err) {
        return console.log(err)
    }

    console.log(`服务已经启动, 访问 http://localhost:${port}`);
});
