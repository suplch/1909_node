const connect = require('../cal/network.js');

function welcome(name) {
    return `欢迎 ${name} 来到 深圳`
}

connect('127.0.0.1');

// module 是nodejs 提供的一个模块对象
// 它的 exports属性用来导出对象
// 导出的对象会作为 require 的返回值 返回
module.exports = welcome;
