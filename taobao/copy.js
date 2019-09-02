const fs = require('fs');


fs.readFile('./nodevideo.mp4', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    console.log(data.length);
    fs.writeFile('./nodevideo.bak.mp4', data, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('复制完毕');

    })
});
