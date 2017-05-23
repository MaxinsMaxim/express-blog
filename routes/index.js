/**
 * Created by maxin on 2017/5/20.
 */

let express = require('express');
let {Article} = require('../model');
let router = express.Router();
router.get('/', function (req, res) {
    let {keyword, pageNum, pageSize} = req.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 3 : parseInt(pageSize);
    let query = {};
    if (keyword) {
        query.title = new RegExp(keyword);
        query['$or'] = [
            {
                title: new RegExp(keyword),
            },
            {
                content: new RegExp(keyword)
            }
        ]
    }

    Article.count(query, function (err, count) {
        Article.find(query).sort({createAt: -1}).skip((pageNum - 1) * pageSize).limit(pageSize).populate('user').exec(function (err, articles) { // populate把user转成对象
            // console.log(articles);
            res.render('index', {
                title: 'maxin`s blog',
                keyword,
                pageNum,
                pageSize,
                totalPages: Math.ceil(count / pageSize),
                articles
            });
        });
    });
});
module.exports = router;