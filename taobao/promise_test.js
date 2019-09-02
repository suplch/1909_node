

function get年终奖() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('给你 100万')
        }, 3000)

        //reject(Error('拒绝'))
    });
};


function 升职副总裁() {
    return new Promise(function (resolve, reject) {

        setTimeout(function () {
            resolve('三年后 提升你做副总裁');
        }, 5000)

    });
}



// promise.then(function (result) {
//     console.log(result)
// }).catch(function (err) {
//     console.log(err)
// });


async function main() {
    let ret = await get年终奖();
    console.log(ret);
    let ret222 = await 升职副总裁();
    console.log(ret222);
}


main();
