let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/blog520');

// 定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

// 定义用户模型
let User = mongoose.model('User', UserSchema);
exports.User = User;