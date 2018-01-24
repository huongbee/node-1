module.exports = {
    checkLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        //req.flash('error_msg', 'You are not login');
        res.redirect('/user/login')
    }
}