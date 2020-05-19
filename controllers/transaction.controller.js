// Lowdb
const db = require('../db');

module.exports.getAll = function (req, res) {
    var transactions = db.get('transactions').value()
        .map(function (item) {
            var bookName = db.get('books').find({ id: item.bookid }).value().name;
            var sluong = parseInt(db.get('sessions').find({ id: item.sessionid }).value()[item.bookid]);
            if (item.userid) {
                var userName = db.get('users').find({ id: item.userid }).value().name;
                return { id: item.id, sessionid: item.sessionid, userName, bookName, sluong };
            } else {
                return { id: item.id, sessionid: item.sessionid, bookName, sluong };
            }
        });
    res.render('transactions/index', {transactions});
}