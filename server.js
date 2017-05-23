let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');
let flash = require('connect-flash');
let MongoStore = require('connect-mongo')(session);
let app = express();

let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');

app.set('view engine', 'html'); // 设置模版引擎 html
app.set('views', path.resolve('views'));    // 模版存放根目录
app.engine('html', require('ejs').__express);   // html类型的模版使用ejs来渲染

app.use(express.static(path.resolve('node_modules')));  // 静态文件中间件
app.use(express.static(path.resolve('public')));

app.use(session({
    resave: true,   // 每次客户端请求到服务器都会保存session
    secret: 'maxin',    // 用来加密cookie
    cookie: {
        maxAge: 3600 * 1000 //指定cookie的过期时间
    },
    saveUninitialized: true, //保存未初始化的session
    store: new MongoStore({
        url: require('./config').dbUrl
    })
}));

app.use(flash());   // flash中间件依赖session

app.use(bodyParser.urlencoded({extended: true}));   // 解析客户端提交过来的请求体 <form>

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.keyword = '';
    next();
});


app.use('/', index);
app.use('/user', user);
app.use('/article', article);


app.listen(8080);