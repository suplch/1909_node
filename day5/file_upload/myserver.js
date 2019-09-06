const express = require('express');

const app = express();

const authRouter = require('./auth/auth');
const goodsRouter = require('./goods/goods');


app.use('/auth', authRouter);
app.use('/goods', goodsRouter);

app.get('/test', function (req, res) {
    res.send('test');
});

app.listen(8000, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('ok')
});
