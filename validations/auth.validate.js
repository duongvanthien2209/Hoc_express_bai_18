// Lowdb
const db = require('../db');

module.exports.postLogin = function (req, res, next) {
    var errors = [];
    var email = req.body.email;
    var password = req.body.password;

    if (!email) {
        errors.push('Bạn chưa nhập email');
    }

    if (!password) {
        errors.push('Bạn chưa nhập password');
    }

    if (errors.length > 0) {
        res.render('auth/login', { errors });
        return;
    }

    next();
}

module.exports.postCreate = function (req, res, next) {
    var errors = [];
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    if (!email) {
        errors.push('Bạn chưa nhập email');
    } else {
        var user = db.get('users').find({ email }).value();
        if (user) {
            errors.push('Email bạn nhập đã có người sử dụng');
        }
    }

    if (!name) {
        errors.push('Bạn chưa nhập tên');
    }

    if (!password) {
        errors.push('Bạn chưa nhập password');
    }

    if (errors.length > 0) {
        res.render('auth/create', { errors });
        return;
    }

    next();
}