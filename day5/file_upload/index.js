const express = require('express');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads') // 文件上传的保存路径
    },
    // 给上传文件重命名
    filename: function (req, file, cb) {
        var fileFormat = file.originalname.split('.');
        // 使用 文件字段 的名称 + 时间戳 生成 新文件名
        let ext = fileFormat[fileFormat.length - 1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
});
const upload = multer({
    storage: storage
});


const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

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

app.use('/upload-test', function (req, res, next) {
    console.log('开始执行 中间件')
    req.on('data', function (chunk) {
        console.log(chunk.length);
        console.log(chunk.toString());
    });
    req.on('end', function () {
        console.log('end')
        console.log('结束中间件')
        next();
    })

});

app.post('/upload-test', function (req, res) {
    console.log('业务处理')
});


app.listen(8000);
