const fs = require('fs');

// 创建一个 文件读取流
const sourceStream = fs.createReadStream('./nodevideo.mp4');
// 创建一个 文件写入流
const targetStream = fs.createWriteStream('./nodevideo.bak.mp4');

// 将源数据读取流 通过 pipe 管道 函数 接到 目标数据流中
// 自动完成 数据的 传递 复制
sourceStream.pipe(targetStream);
