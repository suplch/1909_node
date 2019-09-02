
const fs = require('fs');

let httpReq;

// 判断 访问的数据是 http 还是  https
if (process.argv[2].indexOf('http:') === 0) {
    httpReq = require('http');
} else if (process.argv[2].indexOf('https:') === 0) {
    httpReq = require('https');
}

httpReq.get(process.argv[2], function (res) {

    let bodyData = Buffer.alloc(0);

    // 当响应有数据的时候触发 data 事件
    // 回调函数 的 chunk 参数 是返回的buffer数据块
    res.on('data', function (chunk) {
        console.log(chunk);
        console.log(chunk.length);
        bodyData = Buffer.concat([bodyData, chunk]);
    });

    // 当响应数据读取完毕会触发 end 事件
    res.on('end', function () {
        console.log('完毕')

        console.log(bodyData);
        console.log(bodyData.length);
        // 打印 参数
        console.log(process.argv);

        // 将 返回的数据 保存到 本地文件系统中
        // 文件名称由 process.argv[3] 指定
        fs.writeFileSync(process.argv[3], bodyData);

    })
});


