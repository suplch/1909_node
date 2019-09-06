var goodsRouter = express.Router();

goodsRouter.get('/publish_goods', function (req, res) {
    res.send('publish_goods')
});

goodsRouter.get('/get_goods_list', function (req, res) {
    res.send('get_goods_list')
});


module.exports = goodsRouter;
