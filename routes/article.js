let express = require('express');
let router = express.Router();
let {Article} = require('../model');
let {checkLogin, checkNotLogin} = require('../auth');


router.get('/add', checkLogin, function (req, res) {
    res.render('article/add', {
        title: 'maxin`s blog',
        article: {}
    });
});

router.post('/add', checkLogin, function (req, res) {
    let article = req.body;
    article.user = req.session.user._id;
    Article.create(article, function (err, doc) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            req.flash('success', '文章发表成功');
            res.redirect('/');
        }
    })
});

router.get('/detail/:_id', function (req, res) {
    let _id = req.params._id;
    Article.findById(_id, function (err, article) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            res.render('article/detail', {
                title: 'maxin`s blog',
                article
            });
        }
    });
});

router.get('/delete/:_id', function (req, res) {
    let _id = req.params._id;
    Article.remove({_id}, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            req.flash('success', '删除文章成功');
            res.redirect('/');
        }
    });
});

router.get('/update/:_id', function (req, res) {
    let _id = req.params._id;
    Article.findById(_id, function (err, article) {
        res.render('article/add', {
            title: 'maxin`s blog',
            article
        });
    });
});

router.post('/update/:_id', function (req, res) {
    let _id = req.params._id;
    let article = req.body;
    Article.update({_id}, article, function (err, result) {
        if (err) {
            req.flash('error', err);
            res.redirect('back');
        } else {
            req.flash('success', '修改成功');
            res.redirect('/article/detail/' + _id);
        }
    });
});

module.exports = router;