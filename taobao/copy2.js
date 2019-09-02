const fs = require('fs');
// 创建一个 文件读取流
const sourceStream = fs.createReadStream('./nodevideo.mp4');
// 创建一个 文件写入流
const targetStream = fs.createWriteStream('./nodevideo.bak.mp4');


let total = 0;
// 当读取到数据后 会触发 data 事件, 通过事件回调函数 拿到 chunk 数据
// chunk 表示读取到的数据块
sourceStream.on('data', function (chunk) {
    console.log(chunk);
    console.log('读取了 ' + chunk.length + '字节');
    total += chunk.length;

    // 将读取到的数据块写入 目标流中.
    targetStream.write(chunk);
    console.log(`正在写入数据 ${chunk.length}`);
});

// 当数据流 读取结束, 触发 end 事件
sourceStream.on('end', function () {
    console.log('读取完毕');
    console.log('总字节数 ' + total);

    // 源数据流 读取结束, 关闭目标数据流.
    targetStream.close();
});
