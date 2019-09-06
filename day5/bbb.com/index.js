const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log('----------')
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");

    next();
})

app.get('/api/getinfo', function (req, res) {



    res.send({
        name: 'hello'
    })
});


app.listen(5000);

