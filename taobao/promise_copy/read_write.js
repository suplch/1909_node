const fs = require('fs');

module.exports = {
    readFile: function (path) {
        return new Promise(function (resolve, reject) {
            fs.readFile(path, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data)
            })
        });
    },
    
    writeFile: function (path, data) {
        return new Promise(function (resolve, reject) {
            fs.writeFile(path, data, function (err) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            })
        })
    }
};
