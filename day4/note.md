### 整合mongodb + express 框架
+ 实现注册登录
+ 实现商品浏览

### md5加密 字符串
```ecmascript 6
    const crypto = require('crypto');
    // 创建一个md5 加密 算法
    let md5 = crypto.createHash('md5');
    // 对用户密码 进行 md5 加密
    password = md5.update(password).digest('hex');
```

### token 验证
+ 用户登录 服务器端产生一个token (加密字符串) 发送给前端 
+ 前端将token 进行保存   
+ 前端发起数据请求的时候携带token  
+ 服务端 验证token 是否合法  如果合法继续操作   不合法终止操作
+ token 的使用场景   无状态请求   保持用户的登录状态  第三方登录（token+auth2.0）  

```js
const jwt=require('jsonwebtoken')
const scrict='sdjfksdjflajflasjflasjflksf'
 
function creatToken(palyload){
    // 产生token
    palyload.ctime=Date.now()
    return jwt.sign(palyload,scrict)
}
function checkToken(token){
    return  new Promise((resovle,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
           if(err){ reject('token 验证失败')}
           resovle(data)
           })
    })
     
}
module.exports={
    creatToken,checkToken
}
```

```ecmascript 6
// 1.产生公钥和私钥
// 产生私钥  openssl genrsa -out ./private_key.pem 1024    1024 代表私钥长度
// 产生公钥  openssl rsa -in ./private_key.pem -pubout -out ./public_key.pem
 
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const private_key = fs.readFileSync(path.join(__dirname, './private_key.pem'));
const public_key = fs.readFileSync(path.join(__dirname, './public_key.pem'));

const token = jwt.sign({name: 'hello'}, private_key, { algorithm: 'RS256' });
console.log(token);

const decoded = jwt.verify(token, public_key);
console.log(decoded);
```


### jwt+验证码实现注册登录
+ require('jsonwebtoken')
    - var jwt = require('jsonwebtoken');
    - var token = jwt.sign({_id: '11111', userName: 'zhang' }, 'shhhhh');
    - var decoded = jwt.verify(token, 'shhhhh');
    - console.log(decoded.foo) // bar



### cookie+session 用户鉴权
#### Cookie+Session
 
```js
const  cookieParse=require('cookie-parser')
const  session = require('express-session')
 
app.use(session({
    secret: 'hubwizApp', //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60 * 1000 * 60 * 24 }, //设置过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false, //无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
}));
app.get('/somepath', function(req, res) {
  req.session;
})


```
