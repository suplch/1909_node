const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;


const DB_URL = 'mongodb://localhost:27017';

MongoClient.connect(DB_URL, { useNewUrlParser: true,  useUnifiedTopology: true }, function (err, client) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('ok');
    const testDB = client.db('test');

    testDB.collection('c1909').insertOne({name:'大李', age: 43, sex: '女'}, function (err, cmdResult) {
        if (err) {
            return console.log(err)
        }
        console.log(cmdResult.insertedId);
        console.log(cmdResult.insertedCount);
        console.log(cmdResult.result);
    });
});

/**
MongoClient.connect(DB_URL, function (err, client) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('ok');

    // console.log(db);

    //console.log(client)

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
