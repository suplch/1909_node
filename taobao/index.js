const fs = require('fs');

console.log('=========================');
fs.readFile('./english.txt', function (err, data) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
    fs.writeFile('./english.bak.txt', data, function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('复制完毕');

    })
});

console.log("|||||||||||||||||||||||||||");



// console.log('=========================')
//
// fs.readFile('./english.txtfsafsdf', 'utf-8', function (err, data) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });
//
//
// console.log("|||||||||||||||||||||||||||");


// fs.writeFile('./chinese.txt', 'Node.js 是一个单线程, 异步服务环境', function (err) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     console.log('ok');
// });


// console.log('=========================')
//
// let ret = fs.readFileSync('./english.txt', 'utf-8');
// console.log(ret);
//
// console.log("|||||||||||||||||||||||||||");
