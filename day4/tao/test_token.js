const jwt = require('jsonwebtoken');

jwt.sign({name: '张三'}, 'abcdef', function (err, token) {

    console.log(token);

    jwt.verify(token, 'abcdef', function (err, source) {
        console.log(source);
    });

});



