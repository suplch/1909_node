

const opt = require('./test-db');




async function main() {
    let students = await opt.getStudents({}, 3, 2);

    console.log(students);


    let ret = await opt.updateStudent({name: '小小'}, {$set: {name: '小郭'}});

    console.log(ret);
}

main();
