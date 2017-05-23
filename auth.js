// 进入路由之前要求用户未登录，如果未登录的话可继续访问路由，如果已登录，则调回首页，提示已登录
exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}
// 如果要求此路由登录后才能访问，则会判断当前的登录状态
exports.checkLogin = function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/user/signin');
    }
}