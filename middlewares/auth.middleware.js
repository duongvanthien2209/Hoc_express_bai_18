// Lowdb
const db = require('../db');

module.exports.checkLogin = function(req,res,next) {
    var id = req.signedCookies.userId;

    if(!id) {
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id}).value();

    if(!user) {
        res.send('Bạn không được phép truy cập vào hệ thống');
        return;
    }

    res.locals.user = user;
    next();
}