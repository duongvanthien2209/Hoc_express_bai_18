// shortid
const shortid = require('shortid');

// Lowdb
const db = require('../db');

module.exports.checkSession = function(req,res,next) {
    var sessionId = req.signedCookies.sessionId;
    
    if(!sessionId) {
        var id = shortid.generate();
        sessionId = id;
        db.get('sessions').push({ id }).write();
        res.cookie('sessionId', id, {signed: true});
    }

    var session = db.get('sessions').find({id: sessionId}).value();
    var result = [];
    for(var item in session)
    {
        result.push(item);
    }

    res.locals.session = result.slice(1).map(function(item) {
        var book = db.get('books').find({ id: item }).value();
        return book.name;
    });
    res.locals.sessionId = sessionId;

    next();
}