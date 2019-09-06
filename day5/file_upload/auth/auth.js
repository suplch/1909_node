
var authRouter = express.Router();

authRouter.get('/login', function (req, res) {
    res.send('login')
});

authRouter.get('/register', function (req, res) {
    res.send('register')
});


module.exports = authRouter
