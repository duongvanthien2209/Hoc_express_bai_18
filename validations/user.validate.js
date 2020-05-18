module.exports.checkUser = function(req,res,next) {
    var user = res.locals.user;

    if(!user) {
        res.send('Có lỗi xảy ra');
        return;
    }

    if(!user.isAdmin) {
        res.send('Bạn không có quyền truy cập');
        return;
    }

    next();
}