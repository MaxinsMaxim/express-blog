/**
 * Created by maxin on 2017/5/20.
 */

let express = require('express');
let router = express.Router();
router.get('/', function (req, res) {
    res.render('index', {
        title: 'maxin`s blog'
    });
});
module.exports = router;