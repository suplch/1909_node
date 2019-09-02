
const fileOpt = require('./read_write');


async function main() {
    // await es6 关键字 等待 promise 结果的返回
    try {
        let data = await fileOpt.readFile('./englishaaa.txt');
        console.log(data);
        await fileOpt.writeFile('./english.bak.txt', data);
    } catch (err) {
        console.log(err)
    } finally {
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

