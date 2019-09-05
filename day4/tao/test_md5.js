const crypto = require('crypto');
// 创建一个md5 加密 算法
let md5 = crypto.createHash('md5');
// 对用户密码 进行 md5 加密
let password = md5.update('9999999').digest('hex');


console.log(password)
