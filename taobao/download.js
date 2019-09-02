const https = require('https');

// 获取 百度 首页 内容
https.get('https://www.baidu.com', function (res) {

    // 创建一个 buffer 缓冲对象
    let bodyData = Buffer.alloc(0);

    // 当响应有数据的时候触发 data 事件
    // 回调函数 的 chunk 参数 是返回的buffer数据块
    res.on('data', function (chunk) {
        console.log(chunk);
        console.log(chunk.length);

        // chunk 数据块累加到 bodyData 对象里
        // Buffer.concat 函数用来将 多个 buffer数据库 合并
        bodyData = Buffer.concat([bodyData, chunk]);
    });

    // 当响应数据读取完毕会触发 end 事件
    res.on('end', function () {
        console.log('完毕');

        // 打印返回的Buffer数据
        console.log(bodyData);

        // 打印返回的数据长度
        console.log(bodyData.length);

        //将buffer数据转换为utf-8的字符串, 此时应该可以看到网页内容
        console.log(bodyData.toString('utf-8'));
    })
});




// https.get('https://www.baidu.com', function (res) {
//
//     let html = '';
//     res.on('data', function (chunk) {
//         console.log(chunk)
//         html = html + chunk.toString();
//     });
//
//     res.on('end', function () {
//         console.log('完毕')
//
//         console.log(html)
//     })
// });
