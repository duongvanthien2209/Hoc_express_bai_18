// Lowdb
const db = require('../db');

module.exports.getInPage = function (req, res) {
    const n = 20;
    var page = parseInt(req.query.page);
    var items = db.get('books').value();

    var start = (page - 1) * n;
    var end = (page - 1) * n + n;

    var books = items.slice(start, end);

    res.render('books/index', { books });
}

module.exports