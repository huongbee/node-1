module.exports = {
    checkLogin: (req, res, next) => {
        //console.log(req._passport.Passport)
        if (req.isAuthenticated()) {
            return next();
        }
        //req.flash('error_msg', 'You are not login');
        res.redirect('/user/login')
    }
}