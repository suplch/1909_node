const Event = require('events')


let e = new Event();

// 监听 data 事件, 当 data 事件触发后会执行回到函数
e.on('data', function (chunk) {
    console.log('我听到了 hello', chunk);
});

// 监听 end 事件, 当 end 事件触发后会执行回到函数
e.on('end', function () {
    console.log('结束')
});


let chunk = Buffer.alloc(0) //

// 触发 data 事件
e.emit('data', chunk);
e.emit('data', chunk);
e.emit('data', chunk);

// 触发 end 事件
e.emit('end');
