var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const goods_list = [
    {name: '🍎', price: 123},
    {name: '🍇', price: 22},
    {name: '📱', price: 33},
    {name: '💻', price: 444}
  ]

  res.render('index', {
    title: 'Express',
    goods_list,
    greet: function(name) {
      return 'hello greet ' + name;
    },
    person: {
      name: '张三',
      age: 19,
      sex: '女',
      hobbies: [
          '王者荣耀',
          'LOL',
          '看电影'
      ]
    }
  });
});

module.exports = router;
