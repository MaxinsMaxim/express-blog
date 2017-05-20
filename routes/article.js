let express = require('express');
let router = express.Router();

router.get('/add', function (req, res) {
    res.render('article/add', {
        title: 'maxin`s blog'
    });
});

module.exports = router;