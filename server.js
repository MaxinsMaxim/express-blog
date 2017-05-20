let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');

app.set('view engine', 'html'); // 设置模版引擎 html
app.set('views', path.resolve('views'));    // 模版存放根目录
app.engine('html', require('ejs').__express);   // html类型的模版使用ejs来渲染

app.use(express.static(path.resolve('node_modules')));  // 静态文件中间件

app.use(bodyParser.urlencoded({extended: true}));   // 解析客户端提交过来的请求体 <form>

app.use('/' ,index);
app.use('/user' ,user);
app.use('/article', article);


app.listen(8080);