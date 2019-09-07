var express = require('express');
var router = express.Router();

router.get('/info', function (req, res) {
    res.render('about', {
        title: '关于',
        msg: '本站信息'
    });
});

module.exports = router;
