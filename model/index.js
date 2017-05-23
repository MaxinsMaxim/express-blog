let mongoose = require('mongoose');
mongoose.Promise = Promise;
let ObjectId = mongoose.Schema.Types.ObjectId;
mongoose.connect(require('../config').dbUrl);

// 定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
});

// 定义用户模型
let User = mongoose.model('User', UserSchema);
exports.User = User;

let ArticleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: {type: Date, default: Date.now()},
    user: {type: ObjectId, ref: 'User'} // user是一个外键，引用的是另外一个集合（User）的主键,引用的是User的 _id
});
let Article = mongoose.model('Article', ArticleSchema);
exports.Article = Article;