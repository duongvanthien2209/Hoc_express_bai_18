require('dotenv').config(); // Đọc file .env

// Lowdb
const db = require('../db');

// Shortid - Dùng tạo id ngẫu nhiên
const shortid = require('shortid');

// bcrypt - Dùng mã hóa mật khẩu
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Sendgrid - Dùng để gởi email đến người dùng khi họ nhập sai quá số lần quy định
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.getLogin = function (req, res) {
    res.render('auth/login');
}

module.exports.postLogin = async function (req, res) {
    var errors = [];
    var email = req.body.email;
    var user = db.get('users').find({ email }).value();

    if (!user) {
        errors.push('Bạn nhập sai email');
    }

    if (user.wrongLoginCount >= 4) {
        const msg = {
            to: email,
            from: 'duongvanthienbkhoa@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>Cảnh báo! Bạn đã nhập sai quá số lần quy định</strong>',
        };
        sgMail.send(msg).catch(function (error) { console.log(error.response.body) });
        res.send('Bạn đã nhập sai quá số lần quy định');
        return;
    }

    var result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
        // user.wrongLoginCount += 1;
        db.get('users').find({ email }).assign({ wrongLoginCount: user.wrongLoginCount + 1 }).write();
        // console.log(user);
        errors.push('Bạn nhập sai mật khẩu');
    }

    if (errors.length > 0) {
        res.render('auth/login', { errors });
        return;
    }

    res.cookie('userId', user.id, { signed: true });
    res.redirect('/');
}

module.exports.getCreate = function (req, res) {
    res.render('auth/create');
}

module.exports.postCreate = async function (req, res) {
    var id = shortid.generate();
    var password = await bcrypt.hash(req.body.password, saltRounds);

    db.get('users').push({ id, name: req.body.name, password, email: req.body.email, wrongLoginCount: 0 }).write();
    res.redirect('/auth/login');
}