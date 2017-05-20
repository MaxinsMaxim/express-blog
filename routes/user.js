let express = require('express');
let router = express.Router();
let User = require('../model').User;


router.get('/signup', function (req, res) {
    res.render('user/signup', {
        title: 'maxin`s blog'
    });
});

router.post('/signup', function (req, res) {
    let user = req.body;
    User.create(user, function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/user/signin');
        }
    })
});

router.get('/signin', function (req, res) {
    res.render('user/signin', {
        title: 'maxin`s blog'
    });
});

router.post('/signin', function (req, res) {
    let user = req.body;
    User.findOne(user, function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            if (doc) {
                res.redirect('/');
            } else {
                res.redirect('back');
            }
        }
    });
})

router.get('/signout', function (req, res) {
    res.send('退出');
});

module.exports = router;