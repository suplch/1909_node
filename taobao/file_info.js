const fs = require('fs');

// 通过 process.argv 获取 完整的参数
console.log(process.argv);

console.log(fs.existsSync('./nodevideo.mp4'));

fs.stat('./nodevideo.mp4', function (err, stats) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(stats);
});

