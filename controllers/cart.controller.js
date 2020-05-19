// Lowdb
const db = require('../db');

// Shortid
const shortid = require('shortid');
 
module.exports.addBook = function(req,res) {
    var sessionId = req.signedCookies.sessionId;
    var bookId = req.params.id;

    if(!sessionId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var session = db.get('sessions').find({id: sessionId}).value();

    if(!session) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var count = session[bookId]?parseInt(session[bookId]):0;
    db.get('sessions').find({id: sessionId}).assign({ [bookId]: count + 1 }).write();
    res.redirect('/books/?page=1');
}

module.exports.addAll = function(req,res) {
    var sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
        res.send('Có lỗi xảy ra');
        return;
    }

    var userId = req.signedCookies.userId;

    var session = db.get('sessions').find({ id: sessionId }).value();
    var id = shortid.generate();

    if(userId) {
        for(var item in session) {
            if(item !== 'id') {
                db.get('transactions').push({ id, sessionid: sessionId, bookid: item, userid: userId, sluong: session[item] }).write();
            }
        }
    }else {
        for(var item in session) {
            if(item !== 'id') {
                db.get('transactions').push({ id, sessionid: sessionId, bookid: item, sluong: session[item] }).write();
            }
        }
    }

    res.redirect('/transactions');
}
