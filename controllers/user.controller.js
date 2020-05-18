// Lowdb
const db = require('../db');

module.exports.getAll = function(req,res) {
    // res.send('Done');
    var users = db.get('users').value();
    res.render('users/index', {users});
}

module.exports.getDelete = function(req,res) {
    var id = req.params.id;

    db.get('users').remove({id}).write();
    res.redirect('/users');
}