const mongodb = require('mongodb');  // 映入 mongodb 官方依赖模块   npm install mongodb --save
const MongoClient = mongodb.MongoClient;  // 返回 mongodb 客户端对象
const DB_URL = 'mongodb://localhost:27017';   // mongodb 数据库连接字符串


MongoClient.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {  // client 表示连接成功后的客户端对象
    if (err) {
        console.log(err);
        return;
    }

    console.log('ok');
    const testDB = client.db('test');  // 获取 test 数据库

    testDB.collection('c1909').removeMany({age: {$gt: 40}}, function (err, cmdResult) {
        if (err) {
            console.log(err);
            return;
        }

        console.log(cmdResult);
        console.log(cmdResult.deletedCount);
    })
});

// 连接 mongo 数据库
// MongoClient.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {  // client 表示连接成功后的客户端对象
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     console.log('ok');
//     const testDB = client.db('test');  // 获取 test 数据库
//
//     testDB.collection('c1909').updateMany({name: /^大/}, {$set: {age: 53}}, function (err, cmdResult) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(cmdResult);
//
//         console.log(cmdResult.modifiedCount);
//     })
//
//     //  修改一条数据
//     // testDB.collection('c1909').updateOne({name: '小小'}, {$set: {age: 29}}, function (err, cmdResult) {
//     //     if (err) {
//     //         console.log(err);
//     //         return;
//     //     }
//     //     console.log(cmdResult);
//     // })
// });


// // 连接 mongo 数据库
// MongoClient.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {  // client 表示连接成功后的客户端对象
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     console.log('ok');
//     const testDB = client.db('test');  // 获取 test 数据库
//     //  插入一条数据
//     testDB.collection('c1909').insertOne({name:'大李', age: 43, sex: '女'}, function (err, cmdResult) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log(cmdResult.insertedId);  // 返回刚刚插入的数据的 id 值
//         console.log(cmdResult.insertedCount);  // 表示刚才插入了多少条数据
//         console.log(cmdResult.result); // 表示插入操作是否成功
//     });
// });

/**
MongoClient.connect(DB_URL, function (err, client) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('ok');

    const testDB = client.db('test');

    testDB.collection('c1909').find().forEach(function (item) {
        console.log(item);
    });

    // testDB.collection('c1909').find({sex: '女'}).toArray(function (err, result) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //
    //     console.log(result);
    //
    //     client.close();
    //
    // });
});
*/
