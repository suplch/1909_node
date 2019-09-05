const mongodb = require('mongodb');  // 映入 mongodb 官方依赖模块   npm install mongodb --save
const MongoClient = mongodb.MongoClient;  // 返回 mongodb 客户端对象
const DB_URL = 'mongodb://localhost:27017';   // mongodb 数据库连接字符串

let cacheClient;  // 设置一个 客户端连接 缓存对象
function getClient() {
    return new Promise(function (resolve, reject) {
        if (cacheClient) { // 如果缓存对象 有效 直接返回
            resolve(cacheClient);
            return;
        }
        MongoClient.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {  // client 表示连接成功后的客户端对象
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log('一个连接客户端建立');
            cacheClient = client;  // 将 客户端对象 赋值给缓存对象
            resolve(cacheClient);
        });
    });
}
async function getStudents(filter, pageNo, pageSize) {
    const client = await getClient();
    const testDB = client.db('test');
    return new Promise(function (resolve, reject) {
        testDB.collection('c1909')
            .find(filter)
            .skip(pageNo * pageSize)
            .limit(pageSize)
            .toArray(function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
    })
}
async function updateStudent(filter, setObj) {
    const client = await getClient();
    const testDB = client.db('test');
    return new Promise(function (resolve, reject) {
        testDB.collection('c1909').updateMany(filter, setObj, function (err, cmdResult) {
            if (err) {
                return reject(err)
            }
            resolve({
                ok: true,
                count: cmdResult.modifiedCount
            })
        })
    });
}

async function removeStudent(filter) {
    const client = await getClient();
    const testDB = client.db('test');
    return new Promise(function (resolve, reject) {
        testDB.collection('c1909').remove(filter, function (err, cmdResult) {
            if (err) {
                return reject(err)
            }
            resolve({
                ok: true,
                count: cmdResult.deletedCount
            })
        });
    });
}
async function insertStudent(student) {
    const client = await getClient();
    const testDB = client.db('test');
    return new Promise(function (resolve, reject) {
        testDB.collection('c1909').insertOne(student, function (err, cmdResult) {
            if (err) {
                return reject(err)
            }

            resolve({
                ok: true,
                id: insertedId
            })
        })
    });
}
module.exports = {
    getStudents,
    updateStudent
};
