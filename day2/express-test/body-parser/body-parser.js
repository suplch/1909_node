


module.exports = {
    json: function () {
        return function (req, res, next) {
            console.log(req.method);
            let bodyBuf = Buffer.alloc(0);
            if (req.method === 'POST') {

                req.on('data', function (chunk) {
                    console.log(chunk);
                    bodyBuf = Buffer.concat([bodyBuf, chunk])
                });
                req.on('end', function () {
                    console.log('结束');
                    console.log(bodyBuf.toString())

                    req.body = JSON.parse(bodyBuf.toString());
                    next();
                })
            } else {
                next();
            }
        }
    }
};
