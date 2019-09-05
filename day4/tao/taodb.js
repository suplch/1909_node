const mongodb = require('mongodb');  // 映入 mongodb 官方依赖模块   npm install mongodb --save
const MongoClient = mongodb.MongoClient;  // 返回 mongodb 客户端对象
const ObjectId = mongodb.ObjectId;

const DB_URL = 'mongodb://localhost:27017';   // mongodb 数据库连接字符串
let cacheDB;
function getDatabase() {
    return new Promise(function (resolve, reject) {
        if (cacheDB) {
            resolve(cacheDB);
            return;
        }
        MongoClient.connect(DB_URL,
            { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {  // client 表示连接成功后的客户端对象

            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            console.log('一个连接客户端建立');
            let taoDB = client.db('tao');
            cacheDB = taoDB;
            resolve(taoDB);
        });
    });
}
async function getGoodsList() {
    const db = await getDatabase();
    return new Promise(function (resolve, reject) {
        db.collection('goods').find().toArray(function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    });
}

async function addGoods(goods) {
    const db = await getDatabase();
    return new Promise(function (resolve, reject) {
        db.collection('goods').insertOne(goods, function (err, cmdResult) {
            if (err) {
                reject(err);
                return;
            }

            console.log(cmdResult);

            resolve({
                ok: cmdResult.insertedCount === 1
            })
        });
    });
}

async function deleteGoods(good_id) {
    const db = await getDatabase();
    return new Promise(function (resolve, reject) {
        db.collection('goods').deleteOne({_id: ObjectId(good_id)}, function (err, cmdResult) {
            if (err) {
                reject(err);
                return;
            }
            console.log(cmdResult);
            resolve({
                ok: cmdResult.deletedCount === 1,
                msg: cmdResult.deletedCount === 0 ? '没有要删除的数据': ''
            })
        })
    });
}

module.exports = {
    getGoodsList,
    addGoods,
    deleteGoods
};
