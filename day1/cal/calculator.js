function add(a, b) {
    return a + b;
}
function sum(a, b) {
    let ret;
    if (true) {
        ret = a + b;
    }
    return ret;
}
// module 是nodejs 提供的一个模块对象, 它的 exports属性用来导出对象
// 导出的对象会作为 require 的返回值 返回
module.exports = {
    welcome: 'hello',

    eat: function () {
        console.log('I am eating apple');
    },

    add,  // es6 语法糖, 当属性名和属性是一样的时候可以简写
    sum: sum
};
