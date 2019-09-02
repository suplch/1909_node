// require 是 node环境提供的一个方法, 用来 加载其他js模块
// 其 返回值 是 所加载的 js 文件 里 的 module.exports 属性

let obj = require('./cal/calculator.js');

// 建议 大家 把 require 返回的对象 用 const 来声明
const welcome = require('./lib/utils.js');

// 第一次 require 某个js文件的时候会执行
const connect = require('./cal/network.js');
// 再一次 require 相同 的文件 直接返回上一次导出的对象, 不会执行对应的js
const connect111 = require('./cal/network.js');

const connect222 = require('./cal/network.js');

console.log('================');
console.log(connect === connect111);
console.log(connect === connect111);
console.log(connect111 === connect222);
console.log('================');

console.log(obj);
console.log(obj.welcome);

obj.eat();

var a = 1;
var b = 2;
var c = a + b;

let result = obj.add(4, 5);

console.log("Hello World!");

console.log(c);

console.log(result);

console.log(obj.sum(5, 6));

console.log(welcome("张三"));

connect('localhost');
