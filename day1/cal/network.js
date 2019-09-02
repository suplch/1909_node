
function connect(ip) {
    console.log('正在连接 ' + ip);
}

console.log('--正在执行 network.js-----');


if (Math.random() < 0.5) {
    module.exports = connect;
} else {
    module.exports = function (ip) {
        console.log('connecting..... ' + ip);
    }
}


