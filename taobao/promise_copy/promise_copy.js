
const fileOpt = require('./read_write');

// async 将函数声明为 异步函数
// async 和 await 关键字 配合使用
async function main() {
    // await es6 关键字 等待 promise 结果的返回 (就是resolve的参数)
    try {
        // 等待 承诺对象的最终兑现
        let data = await fileOpt.readFile('./englishaaa.txt');
        console.log(data);
        await fileOpt.writeFile('./english.bak.txt', data);
    } catch (err) { // 捕获错误 err ( promise里的reject 的参数)
        console.log(err)
    } finally { // 不论 try 块是否有错, 一定会执行 finally 块
        console.log('终于完了')
    }

}

main();



// const fs = require('fs');
//
//
// fs.readFile('./english.txt', function (err, data) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
//     console.log(data.length);
//     fs.writeFile('./english.bak.txt', data, function (err) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('复制完毕');
//     })
// });

