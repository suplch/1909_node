const fs = require('fs');

module.exports = {
    readFile: function (path) {
        // 返回一个 承诺对象 promise
        return new Promise(function (resolve, reject) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    // 拒绝承诺, 返回一个错误对象
                    reject(err);
                    return;
                }

                // 成功兑现承诺, 返回最终结果
                resolve(data)
            })
        });
    },
    
    writeFile: function (path, data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(path, data, function (err) {
                if (err) {
                    // 拒绝承诺, 返回一个错误对象
                    reject(err);
                    return;
                }

                // 成功兑现承诺, 返回最终结果
                resolve();
            })
        })
    }
};
