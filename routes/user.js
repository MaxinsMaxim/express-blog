let express = require('express');
let multer = require('multer');
let User = require('../model').User;
let uploads = multer({dest: 'public/uploads'});
let {checkLogin, checkNotLogin} = require('../auth');
let router = express.Router();

router.get('/signup', checkNotLogin, function (req, res) {
    res.render('user/signup', {
        title: 'maxin`s blog'
    });
});

router.post('/signup', checkNotLogin, uploads.single('avatar'), function (req, res) {
    let user = req.body;
    user.avatar = `/uploads/${req.file.filename}`;
    User.create(user, function (err, doc) {
        if (err) {
            req.flash('error', '用户注册失败');
            res.redirect('back');
        } else {
            req.flash('success', '用户注册成功');
            res.redirect('/user/signin');
        }
    })
});

router.get('/signin', checkNotLogin, function (req, res) {
    res.render('user/signin', {
        title: 'maxin`s blog'
    });
});

router.post('/signin', checkNotLogin, function (req, res) {
    let user = req.body;
    User.findOne(user, function (err, doc) {
        if (err) {
            req.flash('error', '操作数据库失败');
            res.redirect('back');
        } else {
            if (doc) {
                req.flash('success', '用户登录成功');
                req.session.user = doc; // 向会话对象中写入
                res.redirect('/');
            } else {
                req.flash('error', '用户名或密码不正确');
                res.redirect('back');
            }
        }
    });
});

router.get('/signout', checkLogin, function (req, res) {
    req.session.user = null;
    res.redirect('/user/signin');
});

module.exports = router;